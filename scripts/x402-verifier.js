const invoice={id:'inv-1',price:500000,recipient:'moolnivashi-x402',expiresAt:Date.now()+60000};
const used=new Set();
function verify(tx){
  if(Date.now()>invoice.expiresAt) return {ok:false,reason:'expired'};
  if(used.has(tx.id)) return {ok:false,reason:'replay'};
  if(tx.recipient!==invoice.recipient) return {ok:false,reason:'recipient'};
  if(tx.amount<invoice.price) return {ok:false,reason:'underpayment'};
  if(tx.memo!==invoice.id) return {ok:false,reason:'memo'};
  used.add(tx.id); return {ok:true};
}
if(verify({id:1,recipient:'wrong',amount:500000,memo:'inv-1'}).ok) throw new Error('recipient mismatch accepted');
if(verify({id:2,recipient:invoice.recipient,amount:1,memo:'inv-1'}).ok) throw new Error('underpayment accepted');
if(verify({id:3,recipient:invoice.recipient,amount:500000,memo:'wrong'}).ok) throw new Error('memo mismatch accepted');
if(!verify({id:4,recipient:invoice.recipient,amount:500000,memo:'inv-1'}).ok) throw new Error('valid proof rejected');
if(verify({id:4,recipient:invoice.recipient,amount:500000,memo:'inv-1'}).ok) throw new Error('replay accepted');
console.log('x402 proof-contract validation: PASS (live ledger lookup remains separate production gate)');
