import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaGovernance {
  public type Proposal = {
    id : Nat;
    title : Text;
    target_chain : Text;
    action_type : Text;
    yes_votes : Nat;
    no_votes : Nat;
    status : Text;
  };

  stable var proposal_counter : Nat = 0;
  let proposals = HashMap.HashMap<Text, Proposal>(100, Text.equal, Text.hash);

  public shared({ caller }) func submit_proposal(title : Text, target_chain : Text) : async Proposal {
    proposal_counter += 1;
    let p : Proposal = {
      id = proposal_counter;
      title = title;
      target_chain = target_chain;
      action_type = "UPDATE_CHAIN_ADAPTER_POLICY";
      yes_votes = 1;
      no_votes = 0;
      status = "ACTIVE";
    };
    proposals.put(Nat.toText(proposal_counter), p);
    p
  };

  public query func get_proposals() : async [Proposal] {
    var out : [Proposal] = [];
    for ((_, p) in proposals.entries()) {
      out := Array.append(out, [p]);
    };
    out
  };
}
