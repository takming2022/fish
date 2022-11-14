import React, { Component } from 'react'
import _const from './const'
import '../src/style.css'

class Shark extends Component {
    constructor() {
        super();
        this.state = {
            x: (window.innerWidth +600),
            xDirection: 'right',
            xVelocity: 50,
            y:(window.innerHeight -510),
            yDirection: 'down',
            yVelocity: 0,
            z: _const.min_z,
            zVelocity: 0.5
        }
    }
    
    move() {
        let { xVelocity, xDirection, yVelocity, yDirection, zVelocity, zDirection } = this.state;
        
        if (this.state.x >
            (window.innerWidth - 2 * _const.image_width)) {
            xDirection = 'left';
        } else if (this.state.x < _const.image_width) {
            xDirection = 'right';
        }
        if (this.state.y >
            (window.innerHeight - 2 * _const.image_height)) {
            yDirection = 'up';
        } else if (this.state.y < _const.image_height) {
            yDirection = 'down';
        }
        if (this.state.z > (-1)) {
            zDirection = 'in';
        } else if (this.state.z < _const.min_z) {
        }
        this.setState({
            x: this.state.x + (xDirection === 'right' ? -xVelocity : -xVelocity),
            xDirection: xDirection,
            y: this.state.y + (yDirection === 'down' ? -yVelocity : -yVelocity),
            yDirection: yDirection,
            z: this.state.z + (zDirection === 'in' ? -zVelocity : zVelocity),
            zDirection: zDirection
        })

    }

    
    tick() {
        this.move();
        // if(this.state.x < -(_const.image_width)*6 ){
        //     this.setState({
        //         x:(window.innerWidth ),
        //         xVelocity: 0,
        //         y:(window.innerHeight ),
        //         yVelocity: 0
        //     })
        //     setTimeout(() => {
        //         this.setState({ 
        //             xVelocity: 50,
        //             yVelocity: 0
        //         })
        //     }, 5000);
        // }
    }
    componentDidMount() {
        setTimeout(() => {
            this.timeID = setInterval(() => this.tick(), _const.tick_interval);

        }, 15);

    }
    render() {
        let yScale = 3 ;
        let xScale = (this.state.xDirection === 'right' ? yScale : -yScale);
        let fishScale = { transform: `scaleX(15) scaleY(15)` };
        let fishStyle = { ...fishScale, left: this.state.x, top: this.state.y }
        return (
            <div><img className='shark' src={this.props.img} alt="123" style={fishStyle} /></div>
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}


export default Shark
