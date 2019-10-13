import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../actions/actionCreators';
import PropTypes from 'prop-types';

//import css
import '../css/login.css';
import '../App.css';


class Login extends React.Component{
	userNameRef = React.createRef();
	passwordRef = React.createRef();
	
	state = {
		status: ""
	};
	
	static propTypes = {
		loginCred: PropTypes.shape({
			userName: PropTypes.string,
			password: PropTypes.string
		})
	}
	
	//function to validate user name(email) format and whether password is empty
	validate = (e) =>{
		e.preventDefault();
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(this.userNameRef.current.value)){
			if(this.passwordRef.current.value){
				this.redirectToFilters();
			}
			else{
				this.setState({status: "Please enter password"});
			}
			
		}
		else{
			this.setState({status: "Please enter a valid email id"});
		}
	}
	
	//function to redirect to filters 
	redirectToFilters = () => {
		this.props.login(this.userNameRef.current.value, this.passwordRef.current.value);
		axios.get('http://localhost:3001/api/').then(console.log);
		this.props.history.push("/filters");
	}
	render(){
		const { props:{loginCred}, userNameRef, passwordRef, validate, state:{status}} = this;
		let error;
		if(status){
			error=(<span className="error">{status}</span>);
		}
		return(
			<div className="Login">
				<h2>Login</h2>
				<form name="form" onSubmit={validate}>
					<div className="form-group">
						<label className="login-label">Username(EMAIL ID) </label>
						<input type="text" className="form-control" defaultValue={loginCred.userName} ref={userNameRef}/>
					</div>
					<div className="form-group">
						<label className="login-label">Password </label>
						<input type="password" className="form-control" defaultValue={loginCred.password} ref={passwordRef}/>
					</div>
					{error}
					<button className="btn login-button" type="Submit" >Login</button>
				</form>
			</div>
		)
	}
}

//connect store to login component
function mapStateToProps(state) {
  return {
    loginCred:state.loginCred,
	filters:state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLoginPage as Login };