import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
// import { getLoginUserInformatiomFromDb}   from '../../src/DbClient';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userInfo: [],
        }
    }
    getLoginUserInformation = async(username, password) => {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        const json = await response.json();
        if (json && json.length > 0) {
            this.setState({ userInfo: json });
            localStorage.setItem('isLoginSuccess ', true);
            this.props.history.push({ pathname: '/home', state: { userInfo: json[0]} });
        } else {
            alert('Invalide Username and Password');
        }
    }
    validateLoginInfo = async (event) => {
        event.preventDefault();
        console.log('validateLoginInfo function called');
        const username = this.state.username;
        const password = this.state.password;
        console.log('user name ', username);
        console.log('password ', password);
        if (username.length === 0 || password.length === 0) {
            alert('User Name and Password can not be empty');
            return false;
        }
        const response = await this.getLoginUserInformation(username,password);
        // return false;
        // const value = await getLoginUserInformatiomFromDb(username, password, event);
        // return value || false;
    }
    
    handelUsername = (event) =>{
        this.setState({
            username : event.target.value
        })
    }
    handelPassword = (event) =>{
        this.setState({
            password : event.target.value
        })
    }
    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handelUsername}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handelPassword}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block"  onClick={this.validateLoginInfo} >Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
