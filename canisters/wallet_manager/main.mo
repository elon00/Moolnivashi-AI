import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaWalletManager {
  public type ChainAddress = {
    chain_id : Text;
    derivation_path : Text;
    address : Text;
    created_at : Int;
  };

  let addresses = HashMap.HashMap<Text, [ChainAddress]>(100, Text.equal, Text.hash);

  public shared({ caller }) func store_derived_addresses(addrs : [ChainAddress]) : async Bool {
    let caller_text = Principal.toText(caller);
    addresses.put(caller_text, addrs);
    true
  };

  public shared query({ caller }) func get_my_addresses() : async [ChainAddress] {
    let caller_text = Principal.toText(caller);
    switch (addresses.get(caller_text)) {
      case null [];
      case (?list) list;
    }
  };
}
