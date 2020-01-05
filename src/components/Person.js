import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, Redirect } from 'react-router-dom';
import PersonModel from '../models/PersonModel';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSave, faHome } from '@fortawesome/free-solid-svg-icons'


export default function Person(props) {

    // Set document title
    document.title = "Person";
    const [person, setPerson] = useState(new PersonModel(0, "", ""))
    const [editMode, setEditMode] = useState(false);

    // Path params
    const { id } = props.match.params;
    const API = "http://localhost:8080/api/persons";


    useEffect(() => {
        fetch(`${API}/${id}`).then((response) => response.json()).then((response) => {
            const tempPerson = new PersonModel(id, response.name, response.email);
            console.log(tempPerson);
            setPerson(tempPerson);
        }).catch((err) => {
            alert("No user has been found!")
            props.history.push("/");
        })
    }, []);

    let renderedHTML;

    const handleFormSubmit = (event) => {
        event.preventDefault();
        fetch(`${API}`, {
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
            setPerson(response.person);
        }).catch((err) => {
            alert("No error occurred!")
            setEditMode(false);
        })
    }

    if (editMode) {
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
                            <button className="btn btn-primary btn-sm btn-block mt-4" type="submit"><FontAwesomeIcon icon={faSave} /> Save</button>
                        </form>
                    </div>
                </div>
                <Link to="/"><button className="btn btn-secondary btn-sm mt-4"><FontAwesomeIcon icon={faHome} /> Back Home</button></Link>
            </div>
        )
    } else {
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
                    <button className="btn btn-warning btn-block mt-4" onClick={() => { setEditMode(true) }} ><FontAwesomeIcon icon={faUserEdit} /> Edit person</button>
                    <Link to="/"><button className="btn btn-secondary btn-sm mt-4"><FontAwesomeIcon icon={faHome} />Back Home</button></Link>
                </div>
            </div>
        )
    }
    return renderedHTML;
}
