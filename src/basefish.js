import './App.css';
import Fish from './Fish';
import Shark from './shark';
import { useEffect, useState } from 'react';
import Web3 from 'web3'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { contractInstance_singner, abi ,op_wallet_address} from './contract';
import LogsDecoder from 'logs-decoder';
const Basefish = ({ countal, setDemofishtorf , setCountalll}) => {
  setDemofishtorf(false)
  const [A, setA] = useState(false)
  const [fishs, setFishs] = useState()
  const [op , setop] = useState()
  const history = useNavigate()
  var test = []
  // setInterval(() => {
  //   setA(true)
  // }, 5000);
  useEffect(() => {
    for (var i = 0; i < countal.length; i++) {
      if (Math.random() < 0.2) {
        test[i] = <Fish id={countal[i]} img='./image/魚5.gif' />
      } else if (Math.random() < 0.4) {
        test[i] = <Fish id={countal[i]} img='./image/魚4.gif' />
      } else if (Math.random() < 0.6) {
        test[i] = <Fish id={countal[i]} img='./image/魚3.gif' />
      } else if (Math.random() < 0.8) {
        test[i] = <Fish id={countal[i]} img='./image/魚2.gif' />
      } else if (Math.random() < 1) {
        test[i] = <Fish id={countal[i]} img='./image/魚.gif' />
      }
    }
    setFishs(test)
  }, [countal])
  async function finsh() {
    const ethereum = window.ethereum
    var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    var account = accounts[0];
    var wallet_address = account;
    let amount = Web3.utils.toWei('0')
    let ans = await contractInstance_singner.finish({ from: wallet_address, value: amount.toString() })
    console.log("aaaaaa", ans.hash);
    
    getwinnerinformation(ans.hash)
  }
  async function getwinnerinformation(hash) {
    setTimeout(async () => {
      
      var winnerfishh= []
      const logsDecoder = LogsDecoder.create()
      logsDecoder.addABI(abi)
      var web3 = new Web3(window['ethereum'] || window.web3.currentProvider)//初始化web3 給他一個權限
      await web3.eth.getTransactionReceipt(hash,
        function (e, receipt) {
          try {
            const decodedLogs = logsDecoder.decodeLogs(receipt.logs);
            if (decodedLogs[0].name === 'SentPrizeToWinner') {
              const timestampDate = (parseInt(decodedLogs[0].events[5].value) * 1000)
              const timestampNewDate = moment(new Date(timestampDate)).format("yyyy年MM月DD日 HH時mm分ss秒")
              let SentPrizeToWinner = {
                winner: decodedLogs[0].events[0].value,
                money: parseInt(decodedLogs[0].events[1].value) / 1000000000000000000,
                guess: parseInt(decodedLogs[0].events[2].value),
                gameindex: parseInt(decodedLogs[0].events[3].value),
                lotterynumber: parseInt(decodedLogs[0].events[4].value),
                timestamp: timestampNewDate
              }
              winnerfishh[0] = SentPrizeToWinner.guess
              setA(true)
              setTimeout(() => {
                setCountalll(winnerfishh)
              }, 2500);
              setTimeout(() => {
                window.alert('贏家:  ' + SentPrizeToWinner.winner + '\n' +
                '玩家猜測值:  ' + SentPrizeToWinner.guess + '\n' +
                '開獎號碼:  ' + SentPrizeToWinner.lotterynumber + '\n' +
                '贏家獎金:  ' + SentPrizeToWinner.money + '\n' +
                '開牌日期:  ' + SentPrizeToWinner.timestamp + '\n' +
                '第幾場遊戲:  ' + SentPrizeToWinner.gameindex)
              console.log(SentPrizeToWinner);
              history("/")
              }, 8000);
              
  
            }
            if (decodedLogs[1].name === 'SentDeveloperFee') {
              let SentDeveloperFee = {
                amount: parseInt(decodedLogs[1].events[0].value) / 1000000000000000000,
                balance: parseInt(decodedLogs[1].events[1].value) / 1000000000000000000
              };
              console.log(SentDeveloperFee);
            }
            console.log(decodedLogs);
          } catch {
            window.alert("沒有贏家")
            history("/")
          }})
          
    }, 25000)
  }
  setTimeout(() => {
    getAccount()
  }, 1);
  async function getAccount() {
    const ethereum = window.ethereum
    var accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    var wallet_address = accounts[0];
    console.log(wallet_address);
    if(wallet_address.toString() == op_wallet_address.toLowerCase()){
      setop(true)
    }else{
     setop(false)
    }

     
}
  
  return (
    <div className="App">
      <image src='./image/sea1.gif'></image>
      <image src='./image/seagrass.gif'></image>
      {op ? <><button onClick={finsh}>open</button></> : <></>}

      <div>
        <img className='background' src='./image/sea1.gif' alt="123" />
        <div><img className='seed' src='./image/seagrass.gif' alt="123" /></div>
        <div><img className='seed2' src='./image/seagrass.gif' alt="123" /></div>
        <div><img className='seed3' src='./image/seagrass.gif' alt="123" /></div>
        <div><img className='seed4' src='./image/seagrass.gif' alt="123" /></div>
        <div><img className='seed5' src='./image/seagrass.gif' alt="123" /></div>
        <div><img className='seed6' src='./image/seagrass.gif' alt="123" /></div>
        <div><img className='ss' src='./image/珊瑚.png' alt="123" /></div>
        <div><img className='ss2' src='./image/珊瑚.png' alt="123" /></div>
        <div><img className='ss3' src='./image/珊瑚.png' alt="123" /></div>
      </div>
      {fishs}
      {A && <Shark img='./image/shark.gif' />}
    </div>
  );
}

export default Basefish;
