import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Input extends Component{

   render(){
     return (<input type="text" className="form-control" id={this.props.id}>{this.props.text}</input>);
   }

}
export default Input;
