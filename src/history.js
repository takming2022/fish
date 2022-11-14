import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Web3 from 'web3';
import { web3_singner } from './contract';
import './history.css'
import { abi } from './contract';
import LogsDecoder from 'logs-decoder';
const History = ({ setHistorytorf }) => {
    var aa = 0
    var bb = []
    const [exitbutton, setexitbutton] = useState([])
    const [torf , settorf] =useState(false)
    var buttone = []
    web3_singner.events.SentDeveloperFee(null, { fromBlock: 0, toBlock: 'latest' }
        , function (error, event) {
            bb[aa] = event.transactionHash
            aa++
        })
    useEffect(() => {
        setTimeout(async () => {
            var str = '<tr><td>贏家</td><td>玩家猜測值</td><td>開獎號碼</td><td>贏家獎金</td><td>開牌日期</td><td>第幾場遊戲</td></tr>'
            const logsDecoder = LogsDecoder.create()
            logsDecoder.addABI(abi)
            var web3 = new Web3(window['ethereum'] || window.web3.currentProvider)//初始化web3 給他一個權限
            for (var i = bb.length - 1; i >= 0; i--) {
                await web3.eth.getTransactionReceipt(bb[i],
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
                      str+='<tr><td>' + SentPrizeToWinner.winner + '</td>' +
                        '<td>' + SentPrizeToWinner.guess + '</td>' +
                        '<td>' + SentPrizeToWinner.lotterynumber + '</td>' +
                        '<td>' + SentPrizeToWinner.money + '</td>' +
                        '<td>' + SentPrizeToWinner.timestamp + '</td>' +
                        '<td>' + SentPrizeToWinner.gameindex+'</td></tr>'         
                    }
                    if (decodedLogs[1].name === 'SentDeveloperFee') {
                        let SentDeveloperFee = {
                          amount: parseInt(decodedLogs[1].events[0].value) / 1000000000000000000,
                          balance: parseInt(decodedLogs[1].events[1].value) / 1000000000000000000
                        };
                      }
                  } catch {
                    str+="<tr><td>沒有贏家</td><td></td><td></td><td></td><td></td><td>"+i+"</td></tr>"
                    console.log("沒有贏家")
                  }})
            }
            console.log(str);
            settorf(true)
            buttone[0] = <button className='zup' style={{position: 'relative',top:'70px'}} onClick={() => setHistorytorf(false)}>返回主畫面</button>
            setexitbutton(buttone)
            setTimeout(() => {
                document.getElementById("listtab").innerHTML=str
            }, 100);
        }, 1000);
    }, [setHistorytorf])

    return (
        <div className='zup' style={{ height: '100vh', width: '100vw', overflow: 'auto'}}>
            <div className='historydiv' style={{ height: '500px', width: '940px', overflow: 'auto',margin:'0px auto' }}>
                {torf ?<table className='zup' id="listtab" class='listtabb' border="1"></table>:<div style={{height: '100px', width: '100px',position: 'relative',margin:'0px auto',fontSize:'22px'}}>Loading.......</div>}
            </div>  
            {exitbutton}
        </div>
    )
}

export default History