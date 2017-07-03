import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import Label from './Label.js';
import Input from './Input.js';

class Booking extends Component {

	constructor() {
		super();
		this.state = {
			result: ""
		};
	}

	render() {
		let style = {
			margin: "5px 0px 10px 0px",
			borderRadius: "5px"
		};

		return (
			<div className="form-group">
				<label htmlFor="name">
					{this.props.text}
				</label>
				<input style={style} type="text" className="form-control" onChange={this.textChange.bind(this)} ref="name"/>
			</div>
		);
	}

	textChange(e) {
		let value = this.refs.name.value;
		this.props.onTextChange(value);
	}

}
export default Booking;
