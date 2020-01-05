import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus, faUserEdit, faExclamation, faSearch } from '@fortawesome/free-solid-svg-icons'

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
        // create a ref to store the textInput DOM element
        this.searchInput = React.createRef();
    }

    componentDidMount() {
        console.log("componentDidMount")

        // Load persons
        this.loadPersons(0);
    }

    async loadPersons(page, search = null) {
        if ((search != null && search == "") || search == null) {
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
                this.setState({
                    data: null,
                    loading: false,
                    page: null
                });
            })
        } else {
            // Set loading  state
            this.setState({
                loading: true,
                data: []
            })
            const API = "http://localhost:8080/api/persons/";
            fetch(`${API}/search/by-name?name=${search}&size=10&page=${page}`).then((response) => response.json()).then((response) => {
                this.setState({
                    data: response._embedded.persons,
                    loading: false,
                    page: response.page
                });
            }).catch((err) => {
                this.setState({
                    data: null,
                    loading: false,
                    page: null
                });
            })
        }

    }

    deletePersons = (event) => {
        const personId = parseInt(event.target.attributes["data-val"].value);
        const API = "http://localhost:8080/api/persons/";
        fetch(`${API}/${personId}`, {
            method: 'DELETE'
        }).then((response) => response.json()).then((response) => {
            this.loadPersons(0, this.searchInput.current.value);
        }).catch((err) => {
            this.loadPersons(0, this.searchInput.current.value)
        })
        this.setState({
            data: this.state.data.filter(person => person.id !== personId)
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.loadPersons(0, this.searchInput.current.value);
    }

    render() {
        return (
            <div className="row mb-5">
                <div className="col-12">
                    <div className="col-12 mt-4">
                        <form className="form-inline mb-4" onSubmit={this.handleFormSubmit}>
                            <div className="form-row align-items-center">
                                <input ref={this.searchInput} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    <FontAwesomeIcon icon={faSearch} /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <TableRow data={this.state.data} deletePerson={this.deletePersons} loading={this.state.loading} />
                </div>
                <div className="col-12">
                    <Pagination page={this.state.page} loadPersons={this.loadPersons} search={this.searchInput.current} />
                </div>
            </div>
        )
    }
}

function Pagination(props) {
    if (props.page != null) {
        let pages = [];
        if (props.page.totalPages < 5) {
            for (let i = 0; i < props.page.totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 0; i < props.page.totalPages - (props.page.totalPages - 5); i++) {
                pages.push(i);
            }
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={props.page.number === 0 ? 'page-item disabled' : 'page-item'}>
                        <button className="page-link" onClick={() => props.loadPersons(props.page.number - 1, props.search.value)}>Previous</button>
                    </li>
                    {
                        pages.map((index) =>
                            <li className={props.page.number === index ? 'page-item active' : 'page-item'} key={index}>
                                <button className="page-link" onClick={() => props.loadPersons(index, props.search.value)}>{index + 1}</button>
                            </li>
                        )
                    }
                    <li className={props.page.number === props.page.totalPages - 1 ? 'page-item disabled' : 'page-item'}>
                        <button className="page-link" onClick={(() => props.loadPersons(props.page.number + 1, props.search.value))}>Next</button>
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