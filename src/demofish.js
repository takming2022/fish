import React, { useState } from 'react'
import Fish from './Fish'
import Fishs from './Fishs'
import {contractInstance_provider, contractInstance_singner,abi} from './contract'
import Web3 from 'web3';
import moment from 'moment';
const Demofish = () => {
  var fishs = []
  const [ad,setad] = useState(false)
  const [ad_string,set_ad_string] = useState("")
  for (var i = 0; i < 10; i++) {
    if (i/10 <= 0.2) {
      fishs[i] = <Fish img='./image/魚3.gif' />
    } else if (i/10 <= 0.4) {
      fishs[i] = <Fish img='./image/魚4.gif' />
    } else if (i/10 <= 0.6) {
      fishs[i] = <Fish img='./image/魚5.gif' />
    } else if (i/10 <= 0.8) {
      fishs[i] = <Fish img='./image/魚2.gif' />
    } else if (i/10 <= 1) {
      fishs[i] = <Fish img='./image/魚.gif' />
    }
  }
  var adFishs = []
  for (var j = 0; j === 0; j++) {
    if (Math.random() < 1) {
      adFishs[j] = <Fishs img='./image/海馬.gif' />
    }
  }
  setInterval(() => {
    get_ad()
  }, 1000);
  async function get_ad(){
    
    let api =await contractInstance_provider.get_ad();
    let ans = parseInt(api[3]._hex,16)
    let now = new Date().getTime()
    if(now < ans || parseInt(api[3]._hex,16) == 0){
      setad(true)
      set_ad_string(api[1])
    }else{
      setad(false)
    }
  }
  async function add_ad(){
    let wallet_address = document.getElementById('wallet').value;
    console.log(wallet_address);
    let ether = 0.00001; // 抓 ether 值
    console.log(ether);
    let amount = Web3.utils.toWei(ether.toString())
    let guess = "可口可樂好好呵"; // 抓 guess 值
    let ans = await contractInstance_singner.add_ad(guess,{from: wallet_address , value:amount.toString()})
    console.log("ans",ans);
  }
  return (
    <div>
      <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '0' }}><img className='background' src='./image/sea1.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', top: '0px', left: '0px', zIndex: '2' }}><img className='seed' src='./image/seagrass.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', top: '0px', left: '0px', zIndex: '2' }}><img className='seed2' src='./image/seagrass.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', top: '50%', right: '230px', zIndex: '1' }}><img className='seed3' src='./image/seagrass.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', top: '10%', right: '0px', zIndex: '1' }}><img className='seed4' src='./image/seagrass.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', bottom: '10%', right: '0px', zIndex: '0' }}><img className='seed5' src='./image/seagrass.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', bottom: '45%', left: '417px', zIndex: '0' }}><img className='seed6' src='./image/seagrass.gif' alt="123" /></div>
      <div style={{ position: 'fixed ', bottom: '310px', height: '40px', zIndex: '1', opacity: 0.95 }}><img className='ss' src='./image/珊瑚.png' alt="123" /></div>
      <div><img className='bb' src="./image/木板.png" alt="aaa" /></div>
      <div style={{ position: 'fixed ',width:'330px',height: '250px' ,bottom: '140px', left: '1%', zIndex: '0' }}>
        {ad?ad_string:<button onClick={add_ad}>刊登廣告</button>}<button onClick={get_ad}>123</button></div>
      {fishs}
      <button >觀看</button>
      {adFishs}
    </div>
  )
}

export default Demofish