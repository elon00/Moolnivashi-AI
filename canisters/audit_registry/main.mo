import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaAuditRegistry {
  public type AuditEvent = {
    event_id : Nat;
    chain_id : Text;
    action : Text;
    actor_principal : Text;
    payload_hash : Text;
    timestamp : Int;
  };

  stable var event_counter : Nat = 0;
  var events_log : [AuditEvent] = [];

  public shared({ caller }) func log_event(chain_id : Text, action : Text, payload_hash : Text) : async Nat {
    event_counter += 1;
    let evt : AuditEvent = {
      event_id = event_counter;
      chain_id = chain_id;
      action = action;
      actor_principal = Principal.toText(caller);
      payload_hash = payload_hash;
      timestamp = Time.now();
    };
    events_log := Array.append(events_log, [evt]);
    event_counter
  };

  public query func get_recent_events() : async [AuditEvent] {
    events_log
  };
}
