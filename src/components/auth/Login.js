import React, {useEffect, useState} from "react";
import firebase from "../../configuration/FirebaseConfiguration";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {toast} from "react-toastify";
import {Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

const Login = (props) => {

    const [user, setUser] = useState(null);
    const emailInput = React.createRef(null);
    const passwordInput = React.createRef(null);


    document.title = "Login";

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                return <Redirect to="/" />
            } else {
                setUser(null);
            }
        });
    }, [user]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(emailInput.current.value, passwordInput.current.value).then(
            (user) => {
                successNotify("Welcome " + user.user.email);
            }
        ).catch((err) => failedNotify(err.message));
    };

    const successNotify = (message) => {
        toast.success(message);
    }
    const failedNotify = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <div className="row">
            <div className="col-12">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input ref={emailInput} type="email" placeholder="Email" className="form-control"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input ref={passwordInput} type="password" placeholder="Password" className="form-control"
                               id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block"><FontAwesomeIcon icon={faSignInAlt}/> Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
