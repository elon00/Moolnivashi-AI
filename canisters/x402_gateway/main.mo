import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaX402Gateway {
  public type PaymentInvoice = {
    invoice_id : Text;
    service_id : Text;
    price : Nat;
    accepted_chain : Text;
    expires_at : Int;
    status : Text;
  };

  stable var invoice_counter : Nat = 0;
  let invoices = HashMap.HashMap<Text, PaymentInvoice>(200, Text.equal, Text.hash);

  public shared({ caller }) func request_invoice(service_id : Text, chain_id : Text, price : Nat) : async PaymentInvoice {
    invoice_counter += 1;
    let id = "x402-cf-" # Nat.toText(invoice_counter);
    let inv : PaymentInvoice = {
      invoice_id = id;
      service_id = service_id;
      price = price;
      accepted_chain = chain_id;
      expires_at = Time.now() + 600_000_000_000;
      status = "PENDING_CROSS_CHAIN_PAYMENT";
    };
    invoices.put(id, inv);
    inv
  };

  public query func get_invoice(id : Text) : async ?PaymentInvoice {
    invoices.get(id)
  };
}
