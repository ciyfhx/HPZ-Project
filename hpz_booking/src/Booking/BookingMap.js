import React, { Component } from 'react';
import BookingMapCanvas from '../ciyfhx/canvas-book.js';
import axios from 'axios';
import getResources from '../actions/resourcesActions'
import {setResources} from '../actions/bookingActions'
import {connect} from 'react-redux';

@connect((store)=> {
  return {
     resources: store.resources.resources
  }
})
class BookingMap extends Component {

  constructor(){
    super();
    this.state = {
      canvasJS: undefined,
      data: []
    }
  }


  render() {
    return (
      <div><canvas id="canvas-book">

      </canvas> </div>
    );
  }
  componentDidMount() {
    this.setState({canvasJS:new BookingMapCanvas(document.getElementById("canvas-book"), this.state.data, this.props.onSelect)});
    this.updateData();
  }

updateData(){
  const {canvasJS} = this.state;
  this.props.dispatch(getResources()).then(() => {
    const {resources} = this.props;
    let results = resources;
    let i = 0;
    let resultArray = [];
    for (i = 0; i < results.length; i++) {
      let result = results[i];
      resultArray.push({
        x:result.location.x,
        y:result.location.y,
        selected: false,
        resourceId: result._id,
        booked: result.booked,
        name: result.name


      });
    }
    this.setState({data:resultArray})
    this.props.dispatch(setResources(resultArray))
    this.state.canvasJS.update(this.state.data);
  });
 }




}

export default BookingMap;
