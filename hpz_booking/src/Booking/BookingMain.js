import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import BookingMap from './BookingMap.js';
import Booking from './Booking.js';
import {
	getResourceBookings
} from '../actions/resourcesActions'
import ResourceGanttChart, {
	formatDate,
	parse
} from '../charts/ResourceGanttChart';
import Datetime from 'react-datetime';
import './react-datetime.css';
import axios from 'axios';
import {
	Modal,
	Button
} from 'react-bootstrap';
import classnames from 'classnames';
import {
	book
} from '../actions/bookingActions';
import {
	connect
} from 'react-redux';

@connect((store) => {
	return {
		resources: store.bookings.resources,
		bookerId: store.auth.user.id,
		resourceBookings: store.resources.resourceBookings
	}
})
export default class BookingMain extends Component {

	constructor() {
		super();
		this.state = {
			bookTiming: new Date(),
			duration: 1,
			showModal: false,
			selectedResource: {},
			success: "",
			data: {}
		};
		//this.handleClick = this.handleClick.bind(this);
		this.handleBookTiming = this.handleBookTiming.bind(this);
		this.handleDuration = this.handleDuration.bind(this);
	}

	handleBookTiming(value) {
		this.setState({
			bookTiming: value.toDate()
		});
	}

	handleDuration(value) {
		this.setState({
			duration: value.get('hour')
		});
	}

	close() {
		this.setState({
			showModal: false
		});
	}

	open() {
		this.setState({
			showModal: true
		});
	}

	handleClick() {
		// console.log(this)
		// //const resource = this.props.resources.filter((resource) => resource.selected)[0];//Get the first array element
		// this.setState({ showModal: true });
		// 		//console.log({selectedResource: resource})
		// 		console.log(this.state)
		// //this.open();
		const resource = this.props.resources.filter((resource) => resource.selected)[0];
		this.setState({
			selectedResource: resource
		}, this.open());

	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h1 className="page-header">Booking</h1>
						<div id="content-booking">
							<div>
								{this.state.success && <div className={classnames("alert", {
									'alert-success': this.state.success
								})}>{this.state.success}</div>}
								<BookingMap onSelect={this.refreshGanttChart.bind(this)}></BookingMap>
								<div className="panel panel-default">
									<div className="panel-heading">Booking</div>
									<div className="panel-body">
										<div className="row">
											<div className="col-lg-3">
												<form role="feedback">
													<div className="form-group">
														<label>Book Timing</label>
														<Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm" defaultValue={this.state.bookTiming} onChange={this.handleBookTiming}/>
													</div>
													<div className="form-group">
														<label>Duration (In Hours)</label>
														<Datetime dateFormat={false} timeFormat="HH" defaultValue={new Date(0, 0, 0, this.state.duration)} onChange={this.handleDuration}/>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<Button type="submit" bsStyle="primary" onClick={this.handleClick.bind(this)}>Book</Button>
								<br/>
								<div className="gantt-container">
									<ResourceGanttChart bookings={this.state.data}/>
								</div>
								<label htmlFor="result">
									{this.state.result}
								</label>
							</div>
						</div>
					</div>
				</div>
				<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Are you sure you want to book this resource?</h4>
						<p>
							<strong>Resource:
							</strong>{this.state.selectedResource.name}</p>
						<p>
							<strong>Book Timing:
							</strong>{this.state.bookTiming.toDateString()}</p>
						<p>
							<strong>Duration:
							</strong>{this.state.duration}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="primary" onClick={this.book.bind(this)}>Book</Button>
						<Button onClick={this.close.bind(this)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

	book() {

		const selectedResource = this.state.selectedResource;
		if (selectedResource) {
			this.props.dispatch(book({
				resourceId: selectedResource.resourceId,
				bookTiming: this.state.bookTiming,
				bookerId: this.props.bookerId,
				duration: this.state.duration
			})).then(() => this.setState({
				success: "Successfully Booked"
			}), err => console.log(err))
		}
		this.close();
	}

	refreshGanttChart(data) {
		this.props.dispatch(getResourceBookings(data.resourceId)).then(() => {
			console.log(this.props.resourceBookings);
			parse(this.toGanttData(this.props.resourceBookings))
		}, err => console.log(err))
	}

	toGanttData(resourceBookings) {
		let data = [];
		let i;
		for (i = 0; i < resourceBookings.length; i++) {
			let booking = resourceBookings[i];
			data.push({
				id: booking._id,
				start_date: formatDate(new Date(booking.bookTiming)),
				duration: booking.duration,
				color:"red"
			})
		}
		console.log(data)
		return {data:data};
	}

}
