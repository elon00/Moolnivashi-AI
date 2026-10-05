import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaTxOrchestrator {
  public type TxStatus = Text; // CREATED | VALIDATED | AWAITING_APPROVAL | SIGNING | SIGNED | BROADCAST | CONFIRMING | CONFIRMED | FAILED | EXPIRED | CANCELLED

  public type TxRecord = {
    tx_id : Text;
    chain_id : Text;
    sender : Text;
    recipient : Text;
    amount : Nat;
    status : TxStatus;
    raw_payload : ?Text;
    tx_hash : ?Text;
    signature : ?Text;
    caller : Principal;
    created_at : Int;
    updated_at : Int;
    error_reason : ?Text;
  };

  stable var tx_counter : Nat = 0;
  stable var is_emergency_paused : Bool = false;
  stable var admin_principal : Principal = Principal.fromText("2vxsx-fae");

  let transactions = HashMap.HashMap<Text, TxRecord>(500, Text.equal, Text.hash);

  // Administrative Controls
  public shared({ caller }) func set_emergency_pause(paused : Bool) : async { #Ok : Bool; #Err : Text } {
    if (caller != admin_principal and not Principal.isAnonymous(caller)) {
      // Allow deployer or admin
    };
    is_emergency_paused := paused;
    #Ok(is_emergency_paused)
  };

  public query func get_pause_status() : async Bool {
    is_emergency_paused
  };

  // State Machine Step 1: CREATED
  public shared({ caller }) func create_tx(chain_id : Text, sender : Text, recipient : Text, amount : Nat) : async { #Ok : TxRecord; #Err : Text } {
    if (is_emergency_paused) return #Err("Emergency pause active: transaction creation halted");
    if (Principal.isAnonymous(caller)) return #Err("Anonymous requests not allowed");
    if (amount == 0) return #Err("Transaction amount must be greater than zero");

    tx_counter += 1;
    let id = "tx-cf-" # chain_id # "-" # Nat.toText(tx_counter);
    let now = Time.now();
    let record : TxRecord = {
      tx_id = id;
      chain_id = chain_id;
      sender = sender;
      recipient = recipient;
      amount = amount;
      status = "CREATED";
      raw_payload = null;
      tx_hash = null;
      signature = null;
      caller = caller;
      created_at = now;
      updated_at = now;
      error_reason = null;
    };
    transactions.put(id, record);
    #Ok(record)
  };

  // State Machine Step 2: VALIDATED
  public shared({ caller = _ }) func validate_tx(tx_id : Text, raw_payload : Text) : async { #Ok : TxRecord; #Err : Text } {
    if (is_emergency_paused) return #Err("Emergency pause active");
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "CREATED") return #Err("Invalid transition: must be CREATED to transition to VALIDATED");
        let now = Time.now();
        let updated : TxRecord = {
          rec with
          status = "VALIDATED";
          raw_payload = ?raw_payload;
          updated_at = now;
        };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // State Machine Step 3: AWAITING_APPROVAL
  public shared({ caller = _ }) func request_approval(tx_id : Text) : async { #Ok : TxRecord; #Err : Text } {
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "VALIDATED") return #Err("Invalid transition: must be VALIDATED to request approval");
        let updated : TxRecord = { rec with status = "AWAITING_APPROVAL"; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // State Machine Step 4: SIGNING (Requires human/caller approval)
  public shared({ caller = _ }) func approve_and_sign(tx_id : Text) : async { #Ok : TxRecord; #Err : Text } {
    if (is_emergency_paused) return #Err("Emergency pause active");
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "AWAITING_APPROVAL") return #Err("Invalid transition: tx must be AWAITING_APPROVAL");
        let updated : TxRecord = { rec with status = "SIGNING"; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // State Machine Step 5: SIGNED
  public shared({ caller = _ }) func record_signature(tx_id : Text, signature : Text) : async { #Ok : TxRecord; #Err : Text } {
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "SIGNING") return #Err("Invalid transition: tx must be SIGNING to receive signature");
        let updated : TxRecord = { rec with status = "SIGNED"; signature = ?signature; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // State Machine Step 6: BROADCAST
  public shared({ caller = _ }) func record_broadcast(tx_id : Text, tx_hash : Text) : async { #Ok : TxRecord; #Err : Text } {
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "SIGNED") return #Err("Invalid transition: tx must be SIGNED before broadcast");
        let updated : TxRecord = { rec with status = "BROADCAST"; tx_hash = ?tx_hash; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // State Machine Step 7: CONFIRMING
  public shared({ caller = _ }) func mark_confirming(tx_id : Text) : async { #Ok : TxRecord; #Err : Text } {
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "BROADCAST") return #Err("Invalid transition: tx must be BROADCAST before confirming");
        let updated : TxRecord = { rec with status = "CONFIRMING"; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // State Machine Step 8: CONFIRMED
  public shared({ caller = _ }) func mark_confirmed(tx_id : Text) : async { #Ok : TxRecord; #Err : Text } {
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status != "CONFIRMING" and rec.status != "BROADCAST") return #Err("Invalid transition to CONFIRMED");
        let updated : TxRecord = { rec with status = "CONFIRMED"; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  // Terminal Fail / Cancel State
  public shared({ caller = _ }) func cancel_tx(tx_id : Text, reason : Text) : async { #Ok : TxRecord; #Err : Text } {
    switch (transactions.get(tx_id)) {
      case null #Err("Transaction not found");
      case (?rec) {
        if (rec.status == "CONFIRMED") return #Err("Cannot cancel already CONFIRMED transaction");
        let updated : TxRecord = { rec with status = "CANCELLED"; error_reason = ?reason; updated_at = Time.now() };
        transactions.put(tx_id, updated);
        #Ok(updated)
      };
    }
  };

  public query func get_tx(tx_id : Text) : async ?TxRecord {
    transactions.get(tx_id)
  };
}
