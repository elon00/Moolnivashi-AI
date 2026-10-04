import Array "mo:base/Array";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaAutomation {
  public type ScheduledJob = {
    job_id : Nat;
    name : Text;
    target_chain : Text;
    interval_seconds : Nat;
    is_active : Bool;
  };

  stable var job_counter : Nat = 0;
  let jobs = HashMap.HashMap<Text, ScheduledJob>(20, Text.equal, Text.hash);

  let j1 : ScheduledJob = { job_id = 1; name = "Bitcoin UTXO Mempool Sweep"; target_chain = "bitcoin"; interval_seconds = 3600; is_active = true };
  let j2 : ScheduledJob = { job_id = 2; name = "Ethereum/EVM Gas Oracle Sync"; target_chain = "ethereum"; interval_seconds = 300; is_active = true };
  let j3 : ScheduledJob = { job_id = 3; name = "Solana Slot Height Sentinel"; target_chain = "solana"; interval_seconds = 60; is_active = true };

  job_counter := 3;
  jobs.put(Nat.toText(j1.job_id), j1);
  jobs.put(Nat.toText(j2.job_id), j2);
  jobs.put(Nat.toText(j3.job_id), j3);

  public query func get_jobs() : async [ScheduledJob] {
    var out : [ScheduledJob] = [];
    for ((_, j) in jobs.entries()) {
      out := Array.append(out, [j]);
    };
    out
  };
}
