import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";


export default function(ComposedComponent){
  class Authorization extends React.Component{

    componentWillMount(){
      console.log(this.props.isAuthenticated)
      if(!this.props.isAuthenticated){
        this.props.history.push('/login');
      }
    }

    static propsTypes = {
      isAuthenticated: PropTypes.PropTypes.bool.isRequired
    };

    render(){
      return (<ComposedComponent {...this.props}/>)
    }
  }
  return connect(
    (store) => {
      return{isAuthenticated: store.auth.isAuthenticated}
    }
  )(withRouter(Authorization));
}
