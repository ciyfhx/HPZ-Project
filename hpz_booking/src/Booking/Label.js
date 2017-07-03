import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Label extends Component{

   render(){
     return (<label >{this.props.text}</label>);
   }

}
export default Label;
