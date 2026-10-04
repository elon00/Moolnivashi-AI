import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaIdentityAuth {
  public type UserProfile = {
    principal_id : Text;
    registered_at : Int;
    is_whitelisted : Bool;
    linked_chains_count : Nat;
  };

  let profiles = HashMap.HashMap<Text, UserProfile>(100, Text.equal, Text.hash);

  public shared({ caller }) func register_or_get() : async UserProfile {
    let p_text = Principal.toText(caller);
    switch (profiles.get(p_text)) {
      case (?p) p;
      case null {
        let new_p : UserProfile = {
          principal_id = p_text;
          registered_at = Time.now();
          is_whitelisted = true;
          linked_chains_count = 14;
        };
        profiles.put(p_text, new_p);
        new_p
      };
    };
  };

  public query func get_profile(principal_text : Text) : async ?UserProfile {
    profiles.get(principal_text)
  };
}
