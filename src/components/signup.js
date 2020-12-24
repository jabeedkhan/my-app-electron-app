import React, { Component } from "react";
import history from './history';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            signupemail: '',
            signuppassword: '',
            city: '',
            disableSubmitButton: false,
        }
    }
    insertNewUserInfomation = async(username, firstname, lastname, password, city) => {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, firstname, lastname, password, city}),
        });
        const json = await response.json();
        if (json && json.status === 'error' && json.type === 'USER_EXITS') {
            alert('User already exits. Please try with different Id');
            return false;
        }
        if (json && json.status) {
            alert('Registration successful. Please login');
            this.props.history.push('/sign-in');
        } else {
            alert('Invalide Username and Password');
        }
    }

    validateSignupInformation = async(event) => {
        event.preventDefault();
        const fname = this.state.fname;
        const lname = this.state.lname;
        const signupemail = this.state.signupemail;
        const signuppassword = this.state.signuppassword;
        const city = this.state.city;
        if (fname.length === 0 || lname.length === 0 || signupemail.length === 0 || signuppassword.length === 0 || city.length === 0) {
            alert('Form fields can not be empty');
            return false;
        }
        const response = await this.insertNewUserInfomation(signupemail, fname, lname, signuppassword, city);

        return true
    }
    handelFirstname = (event) => {
        this.setState({
            fname: event.target.value
        })
    }
    handelLastname = (event) => {
        this.setState({
            lname: event.target.value
        })
    }
    handelEmail = (event) => {
        this.setState({
            signupemail: event.target.value
        })
    }
    handelPassword = (event) => {
        this.setState({
            signuppassword: event.target.value
        })
    }
    handelCity = (event) => {
        this.setState({
            city: event.target.value
        })
    }
    checkEmailId = async() => {
        const { signupemail: username } = this.state;
        const response = await fetch('http://localhost:3001/validateEmailId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),
        });
        const json = await response.json();
        if (json && json.status === 'error' && json.type === 'USER_EXITS') {
            alert('User already exits. Please try with different Id');
            this.setState({ disableSubmitButton: true });
        } else {
            console.log('json ', json);
            this.setState({ disableSubmitButton: false });
        }
    }
    render() {
        return (
            <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={this.handelFirstname}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={this.handelLastname}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handelEmail} onBlur={this.checkEmailId}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handelPassword}/>
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input type="city" className="form-control" placeholder="Enter City" onChange={this.handelCity}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={this.validateSignupInformation} disabled={this.state.disableSubmitButton}>Sign Up</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p> */}
            </form>
        );
    }
}