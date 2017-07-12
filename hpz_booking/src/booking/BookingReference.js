import React, {
	Component
} from 'react';
import BootstrapTable from 'reactjs-bootstrap-table';
import getBookings from '../actions/bookingActions';
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css'

@connect((store)=>{
	return {
  bookings: store.bookings.bookings
	}
})
export default class BookingReference extends Component {

  constructor(){
		super();
		this.state = {selected: []}
		this.onChange = this.onChange.bind(this)
		this.cancelBookings = this.cancelBookings.bind(this);
	}

	render() {
//     let data = [
//    { id: 1, bookingId: '1', bookTiming: 'BABA', duration: 'lol'},
//    { id: 2, bookingId: '2', bookTiming: 'Why are you reading this', duration: '10?'},
//
let data = this.convertToBookingReference(this.props.bookings)
    let columns = [
      { name: 'bookingId', display: 'Booking ID' },
      { name: 'bookTiming', display: 'Book Timing' },
      { name: 'duration', display: 'Duration' }
    ]

		return (
			<div className="container-fluid">
			<div className="row">
				<div className="col-lg-12">
					<h1 className="page-header">Booking Reference</h1>
          <div id="content-booking-reference"> 
					<BootstrapTable tableClass="table table-bordered table-hover" resize={true} disableSelectText={false} activeClass={"info"}data={data} headers={true} selected={this.state.selected} select={"multiple"}></BootstrapTable>
          <Button bsStyle="danger" onClick={this.cancelBookings}>Cancel</Button>
					</div>
				</div>
			</div>
		</div> )
  }

  cancelBookings(){
		console.log(this.state.selected)
	}

	onChange(newSelection) {
    this.setState({selected: newSelection})
  }

	componentWillMount(){
		this.props.dispatch(getBookings());
	}

  convertToBookingReference(bookings){
		let data = [];
    bookings.forEach((booking)=>{
			data.push({
				id: booking._id,
			  duration: booking.duration,
				bookingId: booking._id,
				bookTiming: booking.bookTiming
			})
		})

		return data
	}

}
