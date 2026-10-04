import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaAgentOrchestrator {
  public type AgentAction = {
    action_id : Text;
    agent_name : Text;
    target_chain : Text;
    action_type : Text;
    is_approved : Bool;
    created_at : Int;
  };

  stable var action_counter : Nat = 0;
  let actions = HashMap.HashMap<Text, AgentAction>(100, Text.equal, Text.hash);

  public shared({ caller }) func propose_action(target_chain : Text, action_type : Text) : async AgentAction {
    action_counter += 1;
    let id = "act-" # Nat.toText(action_counter);
    let act : AgentAction = {
      action_id = id;
      agent_name = "Qmoosa Chain Fusion Copilot";
      target_chain = target_chain;
      action_type = action_type;
      is_approved = false;
      created_at = Time.now();
    };
    actions.put(id, act);
    act
  };

  public shared({ caller }) func approve_action(action_id : Text) : async { #Ok : Bool; #Err : Text } {
    if (Principal.isAnonymous(caller)) return #Err("Human signer authentication required");
    switch (actions.get(action_id)) {
      case null return #Err("Action not found");
      case (?act) {
        let updated : AgentAction = {
          action_id = act.action_id;
          agent_name = act.agent_name;
          target_chain = act.target_chain;
          action_type = act.action_type;
          is_approved = true;
          created_at = act.created_at;
        };
        actions.put(action_id, updated);
        #Ok(true)
      };
    };
  };

  public query func get_all_actions() : async [AgentAction] {
    var out : [AgentAction] = [];
    for ((_, a) in actions.entries()) {
      out := Array.append(out, [a]);
    };
    out
  };
}
