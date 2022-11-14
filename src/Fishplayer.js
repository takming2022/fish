import React, { useEffect, useState } from 'react'
const Fishplayer = ({ img }) => {
    var timer = null
    const [X, setX] = useState(Math.random() * (window.innerWidth - 100))
    const [Y, setY] = useState(Math.random() * (window.innerHeight - 100))
    const [aa, setaa] = useState(1)
    var left = false;
    var right = false;
    var top = false;
    var bottom = false;
    useEffect(() => {
        window.addEventListener('keydown', key, false)
        window.addEventListener('keyup', keyup, false)
        return () => {
            window.removeEventListener('keydown', key, false)
            window.removeEventListener('keyup', keyup, false)
        }
    }, [])
    function key(e) {
        if(e.key === "d")
            right =true
        else if (e.key === "a")
            left =true
        else if (e.key === "s")
            bottom = true
        else if (e.key === "w")
            top = true
        clearInterval(timer)
        timer =setInterval(function(){
            if(right){
                setX(function(prev){
                    setaa(1)
                    return prev+Math.random()
                })
            }else if (left){      
                setX(function(prev){
                    setaa(-1)
                    return prev-Math.random()
                })
            }else if (bottom){
                setY(function(prev){
                    return prev+Math.random()
                })
            }else if (top){
                setY(function(prev){
                    return prev-Math.random()
                })
            }
        },5)
        console.log(e);
    }
    function keyup(){
        left = false;
        right = false;
        top = false;
        bottom = false;
   
    }
    let fishStyle = {transform: `scaleX(${aa})`, left: X + 'px' , top : Y +"px" }
    return (
        <>
            <div id='div1'><img className='fish' src={img} alt="123" style={fishStyle} /></div>
        </>
    )
}

export default Fishplayer