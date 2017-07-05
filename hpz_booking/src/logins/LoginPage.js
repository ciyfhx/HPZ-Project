import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import Nav from '../Nav';
import {
	Route,
	NavLink,
	Switch
} from "react-router-dom";
import PropTypes from 'prop-types';
import {
	connect
} from 'react-redux';
import login from '../actions/loginAction';
import classnames from 'classnames';
import {withRouter} from "react-router-dom";
import {validateInputLogin} from "../utils/Validations"

@connect((store) => {
	return {
  };
},)
class LoginPage extends Component {

	constructor() {
		super();

		this.state = {
			username: "",
			password: "",
      errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	isValid(){
		const {errors, isValid} = validateInputLogin(this.state)

   if(!isValid)this.setState({errors});
		return isValid;
	}



	handleClick() {

		if(this.isValid()){
		this.props.dispatch(login({
			username: this.state.username,
			password: this.state.password
		})).then(() => {this.props.history.push('/book')}, (err) => this.setState({errors: err.response.data}));
	}
	}

	onChange(e) {
		this.setState({
			[e.target.getAttribute('type')]: e.target.value
		})
	}

	render() {
    const {errors} = this.state;
		return ( <div className="container">
		{errors.unableToLogin && <div className="alert alert-danger">{errors.unableToLogin}</div>}
    <div className="row">
        <div className="col-md-4 col-md-offset-4">
            <div className="login-panel panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title"> Please Sign In
                    </h3>
                </div>
                <div className="panel-body">
                    <form role="form">
                        <fieldset>
                            <div className={classnames("form-group", {'has-error':errors.username})}>
                                <input onChange={ this.onChange} className="form-control" placeholder="Username" name="Username" type="username" autoFocus />
                                {errors.username && <span className="help-block">{errors.username}</span>}
                            </div>
                            <div className={classnames("form-group", {'has-error':errors.password})}>
                                <input onChange={ this.onChange} className="form-control" placeholder="Password" name="password" type="password"/>
                                {errors.password && <span className="help-block">{errors.password}</span>}
                                </div>
                            <div className="checkbox">
                                <label>
                                    <input name="remember" type="checkbox" defaultValue="Remember Me" /> Remember Me
                                    </label>
                            </div>
                            <a onClick={this.handleClick} className="btn btn-lg btn-success btn-block">Login </a>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>);
}
}

export default withRouter(LoginPage)
