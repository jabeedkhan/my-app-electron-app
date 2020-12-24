import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
// import Navbar from './NavBar/Navbar';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Profile from './pages/Profile';

function App() {
  return (

    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-light fixed-top">
          <div className="position-static">
            <Link className="navbar-brand" to={"/sign-in"}></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="nav navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route path="/sign-up" component={SignUp} />
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
            </Switch>
            
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
