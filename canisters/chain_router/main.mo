import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaChainRouter {
  public type ChainTier = { #TierA; #TierB; #TierC };

  public type ChainInfo = {
    chain_id : Text;
    name : Text;
    tier : Text;
    signature_scheme : Text;
    is_active : Bool;
    total_routed_txs : Nat;
  };

  public type RouteRequest = {
    chain_id : Text;
    sender : Text;
    recipient : Text;
    amount : Nat;
    asset : Text;
  };

  public type RouteResult = {
    route_id : Text;
    chain_id : Text;
    status : Text;
    created_at : Int;
  };

  stable var route_counter : Nat = 0;
  let chains = HashMap.HashMap<Text, ChainInfo>(20, Text.equal, Text.hash);
  let routes = HashMap.HashMap<Text, RouteResult>(200, Text.equal, Text.hash);

  // Register the 14 chains
  let c_btc : ChainInfo = { chain_id = "bitcoin"; name = "Bitcoin"; tier = "TierA"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };
  let c_doge : ChainInfo = { chain_id = "dogecoin"; name = "Dogecoin"; tier = "TierA"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };
  let c_eth : ChainInfo = { chain_id = "ethereum"; name = "Ethereum"; tier = "TierB"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };
  let c_evm : ChainInfo = { chain_id = "evm"; name = "EVM L2"; tier = "TierB"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };
  let c_sol : ChainInfo = { chain_id = "solana"; name = "Solana"; tier = "TierB"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_apt : ChainInfo = { chain_id = "aptos"; name = "Aptos"; tier = "TierC"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_avax : ChainInfo = { chain_id = "avalanche"; name = "Avalanche"; tier = "TierC"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };
  let c_ada : ChainInfo = { chain_id = "cardano"; name = "Cardano"; tier = "TierC"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_atom : ChainInfo = { chain_id = "cosmos"; name = "Cosmos Hub"; tier = "TierC"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };
  let c_near : ChainInfo = { chain_id = "near"; name = "NEAR"; tier = "TierC"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_dot : ChainInfo = { chain_id = "polkadot"; name = "Polkadot"; tier = "TierC"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_xlm : ChainInfo = { chain_id = "stellar"; name = "Stellar"; tier = "TierC"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_ton : ChainInfo = { chain_id = "ton"; name = "TON"; tier = "TierC"; signature_scheme = "ed25519"; is_active = true; total_routed_txs = 0 };
  let c_xrp : ChainInfo = { chain_id = "xrp"; name = "XRP Ledger"; tier = "TierC"; signature_scheme = "ecdsa_secp256k1"; is_active = true; total_routed_txs = 0 };

  chains.put("bitcoin", c_btc);
  chains.put("dogecoin", c_doge);
  chains.put("ethereum", c_eth);
  chains.put("evm", c_evm);
  chains.put("solana", c_sol);
  chains.put("aptos", c_apt);
  chains.put("avalanche", c_avax);
  chains.put("cardano", c_ada);
  chains.put("cosmos", c_atom);
  chains.put("near", c_near);
  chains.put("polkadot", c_dot);
  chains.put("stellar", c_xlm);
  chains.put("ton", c_ton);
  chains.put("xrp", c_xrp);

  public query func get_supported_chains() : async [ChainInfo] {
    var out : [ChainInfo] = [];
    for ((_, c) in chains.entries()) {
      out := Array.append(out, [c]);
    };
    out
  };

  public shared({ caller }) func dispatch_route(req : RouteRequest) : async { #Ok : RouteResult; #Err : Text } {
    if (Principal.isAnonymous(caller)) return #Err("Caller must authenticate with Internet Identity");
    switch (chains.get(req.chain_id)) {
      case null return #Err("Unsupported chain identifier");
      case (?c) {
        if (not c.is_active) return #Err("Target chain route is currently paused");
        route_counter += 1;
        let route_id = "rt-" # req.chain_id # "-" # Nat.toText(route_counter);
        let res : RouteResult = {
          route_id = route_id;
          chain_id = req.chain_id;
          status = "DISPATCHED_TO_ADAPTER";
          created_at = Time.now();
        };
        routes.put(route_id, res);
        #Ok(res)
      };
    };
  };

  public query func get_router_stats() : async { total_chains : Nat; total_routes : Nat } {
    { total_chains = chains.size(); total_routes = route_counter }
  };
}
