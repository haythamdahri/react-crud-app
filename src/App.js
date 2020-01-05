import React from 'react';
import './App.css';
import logo from './logo.png'
import Home from './components/Home';
import About from './components/About';
import Topics from './components/Topics';
import Person from './components/Person';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLightbulb, faAddressCard } from '@fortawesome/free-solid-svg-icons'

function App() {

  const navTitleStyle = {
    "color": "rgb(87, 198, 229)",
    "margin": 0,
    "letterSpacing": "0.01em"
  }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand font-weight-bold" to="/" style={navTitleStyle}>
          <img src={logo} width="60" height="30" alt="React Application" /> React Application</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/topics"><FontAwesomeIcon icon={faLightbulb} /> Topics</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about"><FontAwesomeIcon icon={faAddressCard} /> About</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/persons/:id" component={Person} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

export default App;
