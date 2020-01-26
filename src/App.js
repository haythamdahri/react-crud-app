import React, {useEffect, useState} from 'react';
import './App.css';
import logo from './logo.png'
import Home from './components/Home';
import About from './components/About';
import Topics from './components/Topics';
import Person from './components/Person';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faHome,
  faLightbulb,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import firebase from "./configuration/FirebaseConfiguration";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedAction, signInAction, signOutAction, signUpAction} from './store/actions/authActions';

function App() {

  // Current authenticated user
  const [user, setUser] = useState(null);

  const auth = useSelector(state => state.authReducer);
  const disptach = useDispatch();

  const navTitleStyle = {
    "color": "rgb(87, 198, 229)",
    "margin": 0,
    "letterSpacing": "0.01em"
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);


  return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand font-weight-bold" to="/" style={navTitleStyle}>
            <img src={logo} width="60" height="30" alt="React Application"/> React Application</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome}/> Home <span
                  className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/topics"><FontAwesomeIcon icon={faLightbulb}/> Topics</Link>
            </li>
            {
              user ? (
                  <li className="nav-item active">
                    <a onClick={(event) => firebase.auth().signOut()} style={{cursor: "pointer"}} className="nav-link"><FontAwesomeIcon icon={faSignOutAlt}/> Logout</a>
                  </li>

              ) : (
                  <>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/login"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/register"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    </li>
                  </>
              )
            }
            <li className="nav-item active">
              <Link className="nav-link" to="/about"><FontAwesomeIcon icon={faAddressCard}/> About</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/persons/:id" component={Person} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route path="/login" exact>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register" exact>
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </div>
    </Router>
  );
}

export default App;
