import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import PersonModel from '../models/PersonModel';
import $ from 'jquery';

export default class Modals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            person: new PersonModel(null, "", "")
        };
        this.toggle = this.toggle.bind(this);
        // create a ref to store the textInput DOM element
        this.saveBtn = React.createRef();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.person.areFieldsNotEmpty() === true) {
            const API = "http://192.168.1.6:8080/api/persons";
            // Set Loading on button
            this.saveBtn.current.innerHTML = `
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                </div>  Saving ...
            `;
            fetch(`${API}`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(this.state.person) // body data type must match "Content-Type" header
            }).then((response) => response.json()).then((response) => {
                this.props.successNotify(`${this.state.person.name} has been saved successfully!`);
                this.props.loadPersons(0, null);
                this.toggle();
            }).catch((err) => {
                this.props.failedNotify("An error occurred, please try again later!");
                this.saveBtn.current.innerHTML = `
                    <FontAwesomeIcon icon={faSave} /> Save
                `;
            })
        } else {
            if (this.state.person.name === "") {
                $("#Name").addClass("is-invalid");
            }
            if (this.state.person.email === "") {
                $("#Email").addClass("is-invalid");
            }
        }
        return false
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}><FontAwesomeIcon icon={faUserPlus} /> Add user</Button>
                <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add a new user</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input type="text" className="form-control" id="Name" onChange={(event) => { this.setState({ person: new PersonModel(this.state.person.id, event.target.value, this.state.person.email) }) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input type="email" className="form-control" id="Email" onChange={(event) => { this.setState({ person: new PersonModel(this.state.person.id, this.state.person.name, event.target.value) }) }} />
                            </div>
                            <button className="btn btn-primary btn-sm btn-block mt-4" ref={this.saveBtn} type="submit"><FontAwesomeIcon icon={faSave} /> Save</button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}><FontAwesomeIcon icon={faWindowClose} /> Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}