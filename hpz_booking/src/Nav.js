import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import {
	NavLink
} from "react-router-dom";
import {
	connect
} from 'react-redux';
import {
	LinkContainer
} from 'react-router-bootstrap';

@connect((store) => {
	return {
		isAuthenticated: store.auth.isAuthenticated,
		username: store.auth.user.username
	}
})
export default class Nav extends Component {

	constructor() {
		super();
		this.state = {
			selected: ""
		}
	}

	handleNav(filter) {
		this.setState({
			selected: filter
		})
		this.props.onChangeFilter(filter);
	}

	checkActive(value) {
		return (this.state.selected === value) ? "active" : "";
	}

	render() {
		const {
			username
		} = this.props;
		console.log(username)
		return (
			<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{
				marginBottom: 0
			}}>
				<div className="navbar-header">
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="index.html">HPZ Booking System</a>
				</div>
				<ul className="nav navbar-top-links navbar-right">
					{username && <li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" href="#">
							<i className="fa fa-user fa-fw"></i>
							<i className="fa fa-caret-down"></i>
						</a>
						<ul className="dropdown-menu dropdown-user">
							<li>
								<a href="#">
									<i className="fa fa-user fa-fw"></i>{username}</a>
							</li>
							<li className="divider"></li>
							<li>
								<a href="login.html">
									<i className="fa fa-sign-out fa-fw"></i>
									Logout</a>
							</li>
						</ul>
					</li>}
				</ul>
				<div className="navbar-default sidebar" role="navigation">
					<div className="sidebar-nav navbar-collapse">
						<ul className="nav" id="side-menu">
							<li>
								<LinkContainer to="/book">
									<a className={this.checkActive("")}>
										<i className="fa fa-edit fa-fw"></i>Booking</a>
								</LinkContainer>
								<LinkContainer to="/create-user">
									<a className={this.checkActive("")}>
										<i className="fa fa-edit fa-fw"></i>Create User
									</a>
								</LinkContainer>
								<LinkContainer to="/feedback">
									<a className={this.checkActive("")}>
										<i className="fa fa-edit fa-fw"></i>FeedBack</a>
								</LinkContainer>
							</li>
						</ul>
					</div>
				</div>

			</nav>
		);
	}
}
