import './loginsing.css';
import { useState } from "react";
import { useNavigate } from 'react-router';
import Web3 from 'web3';
import {contractInstance_provider, contractInstance_singner} from './contract'
const Guess = ({ setCountalll ,setDemofishtorf}) => {
    setDemofishtorf(true)
    const history = useNavigate()
    const [passw, setPassw] = useState("");
    function guessChange(e) {
        setPassw(e.target.value)
    }
    setTimeout(() => {
        getAccount()
    }, 0);
    async function getAccount() {
        const ethereum = window.ethereum
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        var wallet_address = accounts[0];
        document.getElementById('wallet').value = wallet_address;
    }
    async function guess() {
        let wallet_address = document.getElementById('wallet').value;
        console.log(wallet_address);
        let ether = document.getElementById('money').value;; // 抓 ether 值
        console.log(ether);
        let amount = Web3.utils.toWei(ether.toString())
        let guess = parseInt(passw); // 抓 guess 值
        send(amount,wallet_address,guess)
    }
    async function send(amount,wallet_addres,guess) {
        let ans = await contractInstance_singner.addguess(guess,{from: wallet_addres , value:amount.toString()})
        console.log("ans",ans);
    }
    async function getBettingStatus(){
        let playernumber = []
        let api =await contractInstance_provider.getDeveloperAddresss();
        for(var i=0 ; i<api[0].length;i++){
            playernumber[i] = parseInt(api[0][i]._hex,16)
        }
        // let countans = Number(count[1])
         setCountalll(playernumber)
         setTimeout(() => {
             history("/basefish")
         }, 500);
    }

    return (
        <div className='singC'>
            <div className='outC'>
                <p>玩家錢包地址</p>
                <input style={{width :'300px'}} id="wallet" disabled="disabled"></input>
                <p>下注金額</p>
                <input id="money" type="text" value="0.01"disabled="disabled"></input>
                <p>猜數字</p>
                <input type="text" value={passw} placeholder="1-999999" onChange={guessChange}></input>
                <p></p>
                <button onClick={guess} className="bottm">下注</button>
                <button onClick={getBettingStatus}>觀看</button>
            </div>
        </div>
    )
}
export default Guess;