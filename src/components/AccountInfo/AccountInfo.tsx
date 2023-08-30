import type {Coin} from "@cosmjs/stargate"
import {useEffect, useState} from 'react'
import {connect, getSigningCosmWasmClient, WalletConnect} from '@sei-js/core'
import { coins } from '@cosmjs/amino';
import './styles.css'

function App() {
    const [count, setCount] = useState(0)
    const [wallet, setWallet] = useState<WalletConnect>()

    useEffect(() => {
        connect('keplr', 'pacific-1').then(setWallet)
    }, [])

    useEffect(() => {
        fetchCount().then(setCount)
    }, [wallet])

    const fetchCount = async () => {
      if(!wallet) return;
  
      const client = await getSigningCosmWasmClient("https://sei-rpc.polkachu.com/", wallet.offlineSigner);
      const response = await client.queryContractSmart("sei12uzyf3gkeehdgzuqzhy6nk2039s7l2kre0sknj73c4ngy53klq4qpgpvz6", {get_count: {}})
      return response.count;
  };

 const incrementCounter = async () => {
    if(!wallet) return;
        
    const client = await getSigningCosmWasmClient("https://sei-rpc.polkachu.com/", wallet.offlineSigner);

    const senderAddress = wallet.accounts[0].address;
    const contractAddress = "sei12uzyf3gkeehdgzuqzhy6nk2039s7l2kre0sknj73c4ngy53klq4qpgpvz6";


    const msg = {
        "claim": {},
        
    };

    const fee = { 
       amount: coins(24000, 'usei'),
       gas: "300000"
    };

    let send_amount: Coin[] = [{
        amount: "1000000",
        denom: "usei"
    }]

    const response = await client.execute(senderAddress, "sei12uzyf3gkeehdgzuqzhy6nk2039s7l2kre0sknj73c4ngy53klq4qpgpvz6", msg, fee, "", send_amount).then((res) => {
        console.log(`Success @ height ${res.height}\n\nTxHash: ${res.transactionHash}`)
    });
    
    // Updates the counter state again
    await fetchCount();
}

    return (
        <div>
            <h1>Count is: {count}</h1>
            <button onClick={incrementCounter}>claim</button>
        </div>
    )
}

export default App