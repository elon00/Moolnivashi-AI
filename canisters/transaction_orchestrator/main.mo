import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaTxOrchestrator {
  public type TxRecord = {
    tx_id : Text;
    chain_id : Text;
    sender : Text;
    recipient : Text;
    amount : Nat;
    status : Text;
    tx_hash : ?Text;
    created_at : Int;
  };

  stable var tx_counter : Nat = 0;
  let transactions = HashMap.HashMap<Text, TxRecord>(200, Text.equal, Text.hash);

  public shared({ caller }) func submit_tx(chain_id : Text, sender : Text, recipient : Text, amount : Nat) : async TxRecord {
    tx_counter += 1;
    let id = "tx-cf-" # chain_id # "-" # Nat.toText(tx_counter);
    let record : TxRecord = {
      tx_id = id;
      chain_id = chain_id;
      sender = sender;
      recipient = recipient;
      amount = amount;
      status = "PENDING_CHAIN_KEY_SIGNING";
      tx_hash = null;
      created_at = Time.now();
    };
    transactions.put(id, record);
    record
  };

  public query func get_tx(tx_id : Text) : async ?TxRecord {
    transactions.get(tx_id)
  };
}
