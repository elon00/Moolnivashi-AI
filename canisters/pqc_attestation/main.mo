import Principal "mo:base/Principal";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor QmoosaPqcAttestation {
  public type Attestation = {
    artifact_id : Text;
    algorithm : Text; // "ML-DSA-65 (NIST FIPS 204)"
    manifest_digest : Text;
    pqc_signature_hex : Text;
    signer_identity : Text;
    timestamp : Int;
  };

  let attestations = HashMap.HashMap<Text, Attestation>(50, Text.equal, Text.hash);

  public shared({ caller }) func publish_attestation(art_id : Text, digest : Text, sig : Text) : async Attestation {
    let att : Attestation = {
      artifact_id = art_id;
      algorithm = "ML-DSA-65 (NIST FIPS 204)";
      manifest_digest = digest;
      pqc_signature_hex = sig;
      signer_identity = Principal.toText(caller);
      timestamp = Time.now();
    };
    attestations.put(art_id, att);
    att
  };

  public query func get_attestation(art_id : Text) : async ?Attestation {
    attestations.get(art_id)
  };
}
