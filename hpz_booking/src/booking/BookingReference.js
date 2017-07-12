import React, {
	Component
} from 'react';
import {
	BootstrapTable,
	TableHeaderColumn
} from 'react-bootstrap-table';
import getBookings from '../actions/bookingActions';
import {
	Button
} from 'react-bootstrap'
import {
	connect
} from 'react-redux';
import {cancelBook} from '../actions/bookingActions'

@connect((store) => {
	return {
		bookings: store.bookings.bookings
	}
})
export default class BookingReference extends Component {

	constructor() {
		super();
		this.state = {
			selected: []
		}
		this.onChange = this.onChange.bind(this)
		this.cancelBookings = this.cancelBookings.bind(this);
	}

	render() {
		// let data = [
		// 	{
		// 		id: 1,
		// 		bookingId: '1',
		// 		bookTiming: 'BABA',
		// 		duration: 'lol'
		// 	}, {
		// 		id: 2,
		// 		bookingId: '2',
		// 		bookTiming: 'Why are you reading this',
		// 		duration: '10?'
		// 	}
		// ]

		let data = this.convertToBookingReference(this.props.bookings)
		const selectRowProp = {
		  mode: 'radio',
			clickToSelect: true,
			onSelect: this.onChange
		};
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h1 className="page-header">Booking Reference</h1>
						<div id="content-booking-reference">
							<BootstrapTable data={data} striped={true} hover={true} selectRow={ selectRowProp }>
								<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>No.</TableHeaderColumn>
								<TableHeaderColumn dataField="bookingId">Booking ID</TableHeaderColumn>
								<TableHeaderColumn dataField="bookTiming">Book Timing</TableHeaderColumn>
								<TableHeaderColumn dataField="duration">Duration</TableHeaderColumn>
							</BootstrapTable>
							<Button bsStyle="danger" onClick={this.cancelBookings}>Cancel</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	cancelBookings() {
		this.props.dispatch(cancelBook(this.state.selected.bookingId))
	}

	onChange(row, isSelected) {
		this.setState({
			selected: row
		})
	}

	componentWillMount() {
		this.props.dispatch(getBookings());
	}

	convertToBookingReference(bookings) {
		let data = [];
		console.log(bookings)
		let i = 1;
		bookings.forEach((booking) => {
			data.push({
				id: i,
				duration: booking.duration,
				bookingId: booking._id,
				bookTiming: booking.bookTiming
			})
			i++;
		})
		console.log(data)
		return data
	}

}
