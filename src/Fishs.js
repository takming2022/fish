import React, { Component } from 'react'
import _const from './const'
import '../src/style.css'
class Fishs extends Component {
    constructor() {
        super();
        this.state = {
            x: Math.random() * (window.innerWidth - 2 * _const.image_width),
            xDirection: 'right',
            xVelocity: 2,
            y: Math.random() * (window.innerHeight - 2 * _const.image_height),
            yDirection: 'down',
            yVelocity: 1,
            z : _const.min_z ,
            zVelocity: 0.1
        }
    }
    updatemove() {
        this.setState({
            x: Math.random() * (window.innerWidth - _const.image_width),
            y: Math.random() * (window.innerHeight - _const.image_height),
        })
    }
    move() {
        let { xVelocity, xDirection, yVelocity, yDirection, zVelocity, zDirection } = this.state;
        if (this.state.x > window.innerWidth || this.state.y > window.innerHeight) {
            this.updatemove();
        }
        if (this.state.x >
            (window.innerWidth - 2* _const.image_width)) {
            xDirection = 'left';
        } else if (this.state.x < _const.image_width) {
            xDirection = 'right';
        }
        if (this.state.y > 
            ( window.innerHeight - 2*_const.image_height )) {
            yDirection = 'up';
          } else if (this.state.y <  _const.image_height) {
            yDirection = 'down';
          }
        if (this.state.z > (-1)){
            zDirection = 'in';
        }else if (this.state.z < _const.min_z){
         }
        this.setState({
            x: this.state.x + (xDirection === 'right' ? xVelocity : -xVelocity),
            xDirection: xDirection,
            y: this.state.y + (yDirection === 'down' ? yVelocity : -yVelocity),
            yDirection :yDirection,
            z: this.state.z + (zDirection === 'in' ? -zVelocity : zVelocity),
            zDirection:zDirection
        })

    }      zDirection ='out';
     
    xyzrandom(){
        let xVelocity = Math.random() * _const.max_x_velocity;
        let yVelocity = Math.random() * _const.max_y_velocity;
        let zVelocity = Math.random() * _const.max_z_velocity;
        let xDirection = Math.random() <0.5 ?'left' :'right';
        let yDirection = Math.random() <0.5 ?'up':'down';
        let zDirection = Math.random() <0.5 ? 'in' :'out';
        this.setState({
            xVelocity:xVelocity,
            yVelocity:yVelocity,
            xDirection:xDirection,
            yDirection:yDirection,
            zVelocity:zVelocity,
            zDirection:zDirection
        })
    }
    tick() {
        this.move();
        if(Math.random() < 0.01){
            this.xyzrandom()
        }
    }
    componentDidMount() {
        this.timeID = setInterval(() => this.tick(), _const.tick_interval);
    }
    render() {
        let yScale = 3 - (this.state.z / _const.min_z);
        let xScale = ( this.state.xDirection === 'right' ? yScale : -yScale );
        let fishScale = {transform: `scaleX(${xScale}) scaleY(${yScale})`};
        let fishStyle = { ...fishScale, left: this.state.x, top: this.state.y }
        let textStyle = {  left: this.state.x, top: this.state.y }
        return (
            <div>
                <div className='text' style={textStyle}>{this.props.id}</div>
                <img id={this.props.id} className='hh' src={this.props.img} alt="123" style={fishStyle} />
            </div>
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}

export default Fishs