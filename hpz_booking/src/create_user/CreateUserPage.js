import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import createUser from '../actions/createUserAction';
import {
	validateInputCreateUser
} from "../utils/Validations"
import classnames from 'classnames';
import createUserAction from "../actions/createUserAction";
import{
	Bar, Bubble
} from 'react-chartjs-2'

@connect((store) => {
	return {};
},)
export default class CreateUserPage extends Component {

	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
			confirmPassword: "",
			privilege: 0,
			errors: {},
			success: undefined
		}
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	isValid() {
		const {
			errors,
			isValid
		} = validateInputCreateUser(this.state)

		if (!isValid)
			this.setState({
				errors
			});
		return isValid;
	}

	handleClick() {
		console.log({
			username: this.state.username,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			privilege: this.state.privilege
		})
		if (this.isValid()) {
			this.props.dispatch(createUserAction({
				username: this.state.username,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword,
				privilege: this.state.privilege
			})).then(() => this.setState({success:"Successfully created user"}), (err) => {
				this.setState({
					errors: err.response.data
				})
			})
		}
	}

	onChange(e) {
		this.setState({
			[e.target.getAttribute('name')]: e.target.value
		})
	}

	render() {
		const {
			errors, success
		} = this.state;
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<h1 className="page-header">Create User(Incomplete)</h1>
						<div id="content-booking">
							<div className="panel panel-default">
								<div className="panel-heading">
									Create User Account
								</div>
								<div className="panel-body">
										{success && <div className={classnames("alert", {
											'alert-success': success
										})}>{success}</div>}
									<form role="form">
										<fieldset>
											<div className={classnames("form-group", {
												'has-error': errors.username
											})}>
												<input onChange={this.onChange} className="form-control" placeholder="Username" name="username" type="username" autoFocus/> {errors.username && <span className="help-block">{errors.username}</span>}
											</div>
											<div className={classnames("form-group", {
												'has-error': errors.password
											})}>
												<input onChange={this.onChange} className="form-control" placeholder="Password" name="password" type="password"/> {errors.password && <span className="help-block">{errors.password}</span>}

											</div>
											<div className={classnames("form-group", {
												'has-error': errors.confirmPassword
											})}>
												<input onChange={this.onChange} className="form-control" placeholder="Comfirm Password" name="confirmPassword" type="password"/> {errors.confirmPassword && <span className="help-block">{errors.confirmPassword}</span>}
											</div>
											<div className={classnames("form-group", {
												'has-error': errors.privilege
											})}>
												<label>Privilege</label>
												<select onChange={this.onChange} className="form-control" name="privilege">
													<option>0</option>
													<option>1</option>
												</select>
												{errors.privilege && <span className="help-block">{errors.privilege}</span>}
											</div>
											<a onClick={this.handleClick} className="btn btn-lg btn-success btn-block">Create User
											</a>
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>)
	}

}
