import Array "mo:base/Array";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaTokenRegistry {
  public type TokenRecord = {
    symbol : Text;
    chain_id : Text;
    decimals : Nat;
    is_chain_key_twin : Bool; // e.g. ckBTC, ckETH, ckSOL
    contract_address : ?Text;
  };

  let tokens = HashMap.HashMap<Text, TokenRecord>(50, Text.equal, Text.hash);

  tokens.put("BTC", { symbol = "BTC"; chain_id = "bitcoin"; decimals = 8; is_chain_key_twin = false; contract_address = null });
  tokens.put("ckBTC", { symbol = "ckBTC"; chain_id = "bitcoin"; decimals = 8; is_chain_key_twin = true; contract_address = null });
  tokens.put("ETH", { symbol = "ETH"; chain_id = "ethereum"; decimals = 18; is_chain_key_twin = false; contract_address = null });
  tokens.put("ckETH", { symbol = "ckETH"; chain_id = "ethereum"; decimals = 18; is_chain_key_twin = true; contract_address = null });
  tokens.put("SOL", { symbol = "SOL"; chain_id = "solana"; decimals = 9; is_chain_key_twin = false; contract_address = null });
  tokens.put("ckSOL", { symbol = "ckSOL"; chain_id = "solana"; decimals = 9; is_chain_key_twin = true; contract_address = null });
  tokens.put("DOGE", { symbol = "DOGE"; chain_id = "dogecoin"; decimals = 8; is_chain_key_twin = false; contract_address = null });
  tokens.put("DOT", { symbol = "DOT"; chain_id = "polkadot"; decimals = 10; is_chain_key_twin = false; contract_address = null });

  public query func get_all_tokens() : async [TokenRecord] {
    var out : [TokenRecord] = [];
    for ((_, t) in tokens.entries()) {
      out := Array.append(out, [t]);
    };
    out
  };
}
