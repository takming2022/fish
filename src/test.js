import React from 'react'
import Web3 from 'web3';
import { contractInstance_singner,contractInstance_provider } from './contract';
const Test = () => {
    async function login() {
        if (typeof window.ethereum !== 'undefined') {
            const ethereum =window.ethereum
            console.log('MetaMask is installed!');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            document.getElementById("wallet").value =account
            let apii =await contractInstance_provider.getDeveloperAddresss()
            console.log(apii);
        }
    }
    async function okk() {
        var guess = document.getElementById("text").value
        var money = document.getElementById("money").value
        var wallet =document.getElementById("wallet").value
        var monent  = Web3.utils.toWei(money.toString())
        contractInstance_singner.addguess(guess,{from: wallet ,value:monent.toString()})

    }
    return (
        <div>
            <button onClick={login}>登入</button>
            <p>使用者地址</p>
            <input id ='wallet'></input>
            <p>下注金額</p>
            <input id ='money'></input>
            <p>猜測數字</p>
            <input id ='text'></input>
            <p></p>
            <button onClick={okk}>下注</button>
        </div>
    )
}

export default Test