import React, {
	Component
} from 'react'

export default class FeedbackPage extends Component {

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
										<textarea className="form-control" rows="3"></textarea>
									</div>
									<div className="form-group">
										<button type="button" className="btn btn-success">Submit</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}
