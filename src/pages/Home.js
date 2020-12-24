import React from 'react';
import { useLocation } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = ()=>{
    this.props.history.push('/sign-in');
  }
  render() {
    const userInfo = this.props.location.state.userInfo;
    const { firstname, lastname, emailid, city } = userInfo;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header text-warning text-center">Profile Information</div>
              <div className="card-body text-center">
               <span>First Name : {firstname}</span><br></br>
               <span> Last Name : {lastname}</span><br></br>
               <span>Email Id : {emailid}</span><br></br>
               <span> City : {city}</span>
              </div>
              <div className="card-footer">
                <button onClick={this.logout} className="btn btn-primary btn-block">Logout</button>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-6"></div>

        </div>

      </div>
    );
  }
}



