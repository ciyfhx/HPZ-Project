import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Content from './Content';
import LoginPage from './logins/LoginPage';
import Authorization from './utils/Authorization'

export default class Main extends Component {

  constructor(){
    super();

  }

  render() {
    return ( <BrowserRouter ><MainRoutes/></BrowserRouter>);
  }



}

class MainRoutes extends Component{
  render(){
    return (<Switch>
         <Route exact path = "/login" component = {LoginPage}/>
         <Route path = "/" component = {Authorization(Content)}/></Switch> );
  }
}
