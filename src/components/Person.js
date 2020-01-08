import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PersonModel from '../models/PersonModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSave, faHome, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function Person(props) {

    const successNotify = (message) => {

        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const failedNotify = (message) => {

        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    // Set document title
    document.title = "Person";
    const [person, setPerson] = useState(new PersonModel(null, "", ""))
    const [editMode, setEditMode] = useState(false);
    const [saveBtn] = useState(React.createRef());

    // Path params
    const { id } = props.match.params;
    const API = "http://192.168.1.6:8080/api/persons";


    useEffect(() => {
        fetch(`${API}/${id}`).then((response) => response.json()).then((response) => {
            const tempPerson = new PersonModel(id, response.name, response.email);
            setPerson(tempPerson);
        }).catch((err) => {
            setPerson(null);
        })
    });

    let renderedHTML;

    const handleFormSubmit = (event) => {
        event.preventDefault();
        saveBtn.current.innerHTML = `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
            </div>  Saving ...
        `
        saveBtn.current.setAttribute("disabled", "disabled");
        fetch(`${API}/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(person) // body data type must match "Content-Type" header
        }).then((response) => response.json()).then((response) => {
            setPerson(response);
            setEditMode(false);
            successNotify(`${person.name} has been saved successfully!`);
        }).catch((err) => {
            failedNotify();
            setEditMode(false);
        })
        saveBtn.current.setAttribute("disabled", false);
    }

    if (editMode && person) {
        renderedHTML = (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            {person.name} | Edit Mode
                        </div>
                        <form onSubmit={handleFormSubmit} className="p-2">
                            <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input type="text" className="form-control" value={person.name} id="Name" onChange={(event) => { setPerson(new PersonModel(person.id, event.target.value, person.email)) }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input type="email" className="form-control" value={person.email} id="Email" onChange={(event) => { setPerson(new PersonModel(person.id, person.name, event.target.value)) }} />
                            </div>
                            <button ref={saveBtn} className="btn btn-primary btn-sm btn-block mt-4" type="submit"><FontAwesomeIcon icon={faSave} /> Save</button>
                        </form>
                    </div>
                </div>
                <Link to="/"><button className="btn btn-secondary btn-sm mt-4"><FontAwesomeIcon icon={faHome} /> Back Home</button></Link>
            </div>
        )
    } else if (person) {
        renderedHTML = (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            {person.name} | Read Mode
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Id: {person.id}</li>
                            <li className="list-group-item">Name: {person.name}</li>
                            <li className="list-group-item">Email: {person.email}</li>
                        </ul>
                    </div>
                    <button className="btn btn-warning btn-block mt-4" disabled={person.id == null} onClick={() => { setEditMode(true) }} ><FontAwesomeIcon icon={faUserEdit} /> Edit person</button>
                    <Link to="/"><button className="btn btn-secondary btn-sm mt-4"><FontAwesomeIcon icon={faHome} />Back Home</button></Link>
                </div>
            </div>
        )
    } else {
        renderedHTML = (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            No Person
                        </div>
                        <div className="alert alert-warning font-weight-bold text-center">
                            <FontAwesomeIcon icon={faExclamationCircle} /> No person has been found to edit
                        </div>
                    </div>
                    <Link to="/"><button className="btn btn-secondary btn-sm mt-4"><FontAwesomeIcon icon={faHome} />Back Home</button></Link>
                </div>
            </div>
        )
    }
    return (<div><ToastContainer autoClose={8000} />{renderedHTML}</div>);

}
