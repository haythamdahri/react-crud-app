import React, {Component} from "react";
import firebase from "../../configuration/FirebaseConfiguration";
import {Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.emailInput = React.createRef(null);
        this.passwordInput = React.createRef(null);
        this.passwordInputConfirm = React.createRef(null);
        this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                return <Redirect to="/"/>
            } else {
                this.setState(null);
            }
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.emailInput.current.value, this.passwordInput.current.value).then((user) => {
                this.successNotify("Account has been created successfully");
                return <Redirect to="/login"/>
            }
        ).catch((err) => {
            console.log(err);
            this.failedNotify(err.message)
        });
    };

    handlePasswordConfirm = (event) => {
        if (this.passwordInputConfirm.current.value !== this.passwordInput.current.value) {
            this.passwordInputConfirm.current.className = "form-control is-invalid";
        } else {
            this.passwordInputConfirm.current.className = "form-control is-valid";
        }
    }

    successNotify = (message) => {
        toast.success(message);
    }
    failedNotify = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input ref={this.emailInput} type="email" placeholder="Email" className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone
                                else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input onChange={this.handlePasswordConfirm} ref={this.passwordInput} type="password"
                                   placeholder="Password" className="form-control"/>
                            <div className="invalid-feedback">Example invalid feedback text</div>
                            <div className="valid-feedback">Example invalid feedback text</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password Confirmation</label>
                            <input onChange={this.handlePasswordConfirm} ref={this.passwordInputConfirm} type="password"
                                   placeholder="Password Confirmation" className="form-control"/>
                            <div className="invalid-feedback">Password does not much</div>
                            <div className="valid-feedback">Password confirmation OK</div>
                        </div>
                        <button type="submit" className="btn btn-warning btn-block"><FontAwesomeIcon
                            icon={faUserPlus}/> Create account
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
