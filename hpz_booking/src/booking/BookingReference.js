import React, {
	Component
} from 'react';
import BootstrapTable from 'reactjs-bootstrap-table';

export default class BookingReference extends Component {
	render() {
    let data = [
   { id: 1, bookingId: '1', bookTiming: 'BABA', duration: 'lol'},
   { id: 2, bookingId: '2', bookTiming: 'Why are you reading this', duration: '10?'},
]
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
					<BootstrapTable columns={columns} data={data} headers={true}></BootstrapTable>
          </div>
				</div>
			</div>
		</div> )
  }
}
