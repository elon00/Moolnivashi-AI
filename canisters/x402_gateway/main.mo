import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor MoolnivashiX402Gateway {
  public type PaymentInvoice = {
    invoice_id : Text;
    service_id : Text;
    price : Nat;
    recipient : Text;
    accepted_chain : Text;
    expires_at : Int;
    status : Text;
    settled_tx_id : ?Text;
  };

  public type VerificationResult = { #Success : Text; #Failed : Text };

  stable var invoice_counter : Nat = 0;
  let invoices = HashMap.HashMap<Text, PaymentInvoice>(200, Text.equal, Text.hash);
  let used_txs = HashMap.HashMap<Text, Text>(500, Text.equal, Text.hash);

  public shared({ caller }) func request_invoice(service_id : Text, chain_id : Text, price : Nat) : async { #Ok : PaymentInvoice; #Err : Text } {
    if (Principal.isAnonymous(caller)) return #Err("Authenticated principal required");
    if (price == 0) return #Err("Price must be greater than zero");
    invoice_counter += 1;
    let id = "x402-mool-" # Nat.toText(invoice_counter);
    let recipient = Principal.toText(Principal.fromActor(MoolnivashiX402Gateway));
    let inv : PaymentInvoice = {
      invoice_id=id; service_id; price; recipient; accepted_chain=chain_id;
      expires_at=Time.now()+600_000_000_000; status="PENDING_LEDGER_PROOF"; settled_tx_id=null;
    };
    invoices.put(id,inv);
    #Ok(inv)
  };

  public func settle_with_verified_proof(req : {
    invoice_id : Text;
    tx_id : Text;
    amount : Nat;
    recipient : Text;
    memo : Text;
    chain_id : Text;
    independently_verified : Bool;
  }) : async VerificationResult {
    let inv = switch(invoices.get(req.invoice_id)){case null return #Failed("Invoice not found"); case (?x) x};
    if (not req.independently_verified) return #Failed("Live ledger/RPC verification required");
    if (Time.now() > inv.expires_at) return #Failed("Invoice expired");
    if (req.chain_id != inv.accepted_chain) return #Failed("Chain mismatch");
    if (req.recipient != inv.recipient) return #Failed("Recipient mismatch");
    if (req.amount < inv.price) return #Failed("Underpayment");
    if (req.memo != inv.invoice_id) return #Failed("Memo/invoice binding mismatch");
    switch(used_txs.get(req.tx_id)){case (?_) return #Failed("Replay detected"); case null {}};
    used_txs.put(req.tx_id, req.invoice_id);
    let updated : PaymentInvoice = {
      invoice_id=inv.invoice_id; service_id=inv.service_id; price=inv.price; recipient=inv.recipient;
      accepted_chain=inv.accepted_chain; expires_at=inv.expires_at; status="SETTLED_VERIFIED_PROOF";
      settled_tx_id=?req.tx_id;
    };
    invoices.put(req.invoice_id,updated);
    #Success("Settlement accepted after independently verified proof")
  };

  public query func get_invoice(id:Text) : async ?PaymentInvoice { invoices.get(id) };

  public query func verification_mode() : async Text {
    "FAIL_CLOSED_EXTERNAL_LEDGER_OR_RPC_PROOF_REQUIRED"
  };
}
