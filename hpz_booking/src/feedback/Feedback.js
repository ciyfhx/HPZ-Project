import React, {
	Component
} from 'react'
import sendFeedback from '../actions/feedbackAction';
import {connect} from 'react-redux'

@connect((store)=>{
	return {}
})
export default class FeedbackPage extends Component {

	constructor(){
		super();
		this.state = {
			message: ""
		}
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-lg-12">
						<h1 className="page-header">Feedback</h1>
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">Feedback</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-lg-6">
								<form role="feedback">
									<div className="form-group">
										<label>Feedback</label>
										<textarea className="form-control" rows="3" onChange={this.onChange.bind(this)}></textarea>
									</div>
									<div className="form-group">
										<button type="button" className="btn btn-success" onClick={this.handleClick.bind(this)}>Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	onChange(event){
		this.setState({message:event.target.value})
	}

	handleClick(){
		console.log(this.state.message)
		this.props.dispatch(sendFeedback(this.state.message)).then(()=>console.log("Successfully sended feedback"))
	}

}
