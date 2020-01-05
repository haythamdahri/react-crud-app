import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserEdit, faExclamation } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
        this.deletePersons = this.deletePersons.bind(this);
        // Set document title
        document.title = "Home";
        this.loadPersons = this.loadPersons.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount")

        // Load persons
        this.loadPersons(0);
    }

    async loadPersons(page) {
        // Set loading  state
        this.setState({
            loading: true,
            data: []
        })
        const API = "http://localhost:8080/api/persons";
        fetch(`${API}?size=10&page=${page}`).then((response) => response.json()).then((response) => {
            this.setState({
                data: response._embedded.persons,
                loading: false,
                page: response.page
            });
        }).catch((err) => {
            console.log(err);
            this.setState({
                data: null,
                loading: false,
                page: null
            });
        })
    }

    deletePersons = (event) => {
        const personId = parseInt(event.target.attributes["data-val"].value);
        this.setState({
            data: this.state.data.filter(person => person.id !== personId)
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <TableRow data={this.state.data} deletePerson={this.deletePersons} loading={this.state.loading} />
                </div>
                <div className="col-12">
                    <Pagination page={this.state.page} loadPersons={this.loadPersons} />
                </div>
            </div>
        )
    }
}

function Pagination(props) {
    if (props.page != null) {
        let pages = [];
        for (let i = 0; i < props.page.totalPages - (props.page.totalPages - 5); i++) {
            pages.push(i);
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={props.page.number === 0 ? 'page-item disabled' : 'page-item'}>
                        <button className="page-link" onClick={()=>props.loadPersons(props.page.number - 1)}>Previous</button>
                    </li>
                    {
                        pages.map((index) => {
                            return (
                                <li className={props.page.number === index ? 'page-item active' : 'page-item' } key={index}>
                                    <button className="page-link" onClick={()=>props.loadPersons(index)}>{index + 1}</button>
                                </li>
                            );
                        })
                    }
                    <li className={props.page.number === props.page.totalPages ? 'page-item disabled' : 'page-item'}>
                        <button className="page-link" onClick={(()=>props.loadPersons(props.page.number + 1))}>Next</button>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
            <div></div>
        );
    }
}

function TableRow(props) {
    let tableHTML = "";
    if (props.loading) {
        tableHTML = (
            <tr align="center">
                <td colSpan="5" className="alert alert-info text-center font-weight-bold">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </td>
            </tr>
        )
    } else if (!props.loading && props.data != null && props.data.length > 0) {
        tableHTML = (
            props.data.map((person, i) =>
                <tr key={i} align="center">
                    <th scope="row">{person.id}</th>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>
                        <Link to={'/persons/' + person.id}>
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
    } else if (!props.loading && props.data != null && props.data.length === 0) {
        tableHTML = (
            <tr align="center">
                <td colSpan="5" className="alert alert-warning text-center font-weight-bold">
                    <FontAwesomeIcon icon={faExclamation} /> No person has been found!
                </td>
            </tr>
        )
    } else if (!props.loading && props.data == null) {
        tableHTML = (
            <tr align="center">
                <td colSpan="5" className="alert alert-danger text-center font-weight-bold">
                    <FontAwesomeIcon icon={faExclamation} /> An error occurred!
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