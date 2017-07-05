import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";


export default function(ComposedComponent, requiredPrivilegeLevel){
  class PrivilegeAuthorization extends React.Component{

    componentWillMount(){
      
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
