import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import PersonModel from '../models/PersonModel';

export default class Modals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            person: new PersonModel(null, "", "")
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleFormSubmit = (event) => {
        const API = "http://localhost:8080/api/persons";
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
        })
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}><FontAwesomeIcon icon={faUserPlus} /> Add user</Button>
                <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg" isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add a new user</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleFormSubmit} className="p-2">
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input type="text" className="form-control" id="Name" onChange={(event) => { this.setState({person: new PersonModel(this.state.person.id, event.target.value, this.state.person.email)}) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input type="email" className="form-control" id="Email" onChange={(event) => { this.setState({person: new PersonModel(this.state.person.id, this.state.person.name, event.target.value)}) }} />
                            </div>
                            <button className="btn btn-primary btn-sm btn-block mt-4" type="submit"><FontAwesomeIcon icon={faSave} /> Save</button>
                        </form>                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}><FontAwesomeIcon icon={faWindowClose} /> Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}