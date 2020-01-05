import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserEdit, faExclamation } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ id: 1, name: "Haytham Dahri", email: "haytham.dahri@gmail.com" }, { id: 2, name: "Imrane Dahri", email: "imrane.dahri@gmail.com" }]
        }
        this.deletePersons = this.deletePersons.bind(this);
        // Set document title
        document.title = "Home";
    }

    componentDidMount() {
        console.log("componentDidMount")
    }

    deletePersons = (event) => {
        const personId = parseInt(event.target.attributes["data-val"].value);
        this.setState({
            data: this.state.data.filter(person => person.id !== personId)
        });
        alert("Data has been updated successfully");
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <TableRow data={this.state.data} deletePerson={this.deletePersons} />
                </div>
            </div>
        )
    }
}

function TableRow(props) {
    let tableHTML = "";
    if (props.data.length > 0) {
        tableHTML = (
            props.data.map((person, i) =>
                <tr key={i} align="center">
                    <th scope="row">{person.id}</th>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>
                        <Link to={'/persons/' + person.id + '?name=' + person.name + '&email=' + person.email}>
                            <button className="btn btn-primary btn-sm btn-block">
                                <FontAwesomeIcon icon={faUserEdit} /> Edit
                            </button>
                        </Link>
                    </td>
                    <td>
                        <button className="btn btn-danger btn-sm btn-block" data-val={person.id} onClick={props.deletePerson}>
                            <FontAwesomeIcon icon={faUserMinus} /> Delete
                        </button>
                    </td>
                </tr>
            )
        );
    } else {
        tableHTML = (
            <tr align="center">
                <td colSpan="5" className="alert alert-warning text-center font-weight-bold">
                    <FontAwesomeIcon icon={faExclamation} /> No person has been found!
                </td>
            </tr>
        )
    }
    return (
        <table className="table">
            <thead className="thead-light">
                <tr align="center">
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col" colSpan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                {tableHTML}
            </tbody>
        </table>
    )
}