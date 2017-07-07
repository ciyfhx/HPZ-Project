import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import { Route, NavLink, Switch } from "react-router-dom";
import BookingMain from './Booking/BookingMain'
import CreateUserPage from './create_user/CreateUserPage'
import FeedbackPage from './feedback/Feedback'
import Authorization from './utils/Authorization'

export default class Content extends Component {

  render() {
    return (
      <div id="content">
        <div id="nav"><Nav></Nav></div>
        <div id="page-wrapper">
          <ContentRoutes/>
        </div>
      </div>
    )
  }

}


class ContentRoutes extends Component{
  render(){
    return (<Switch>
         <Route path = "/book" component = {BookingMain}/>
         <Route path = "/create-user" component = {CreateUserPage}/>
         <Route path = "/feedback" component = {FeedbackPage}/>
         </Switch> );
  }
}
