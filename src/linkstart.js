import React from 'react'
import { useNavigate } from 'react-router-dom'

const Linkstart = ({ setDemofishtorf,setHistorytorf }) => {
    setDemofishtorf(true)
    const history = useNavigate()
    return (
        <div >
            <input style={{ position: 'fixed', top: '0.1%', left: '32%', width: '600px', zIndex: 1 }}  type={'image'} src='./image/logo.png'></input>
            <input style={{ position: 'fixed', top: '30%', left: '39%', width: '400px', zIndex: 11 }} onClick={() => history('/login')} type={'image'} src='./image/linkstart.png'></input>
            <input style={{ position: 'absolute', top: '3%', right: '1%', width: '5%', zIndex: 10 }} onClick={() => setHistorytorf(true)} type={'image'} src='./image/history.png'></input>
        </div>
    )
}

export default Linkstart