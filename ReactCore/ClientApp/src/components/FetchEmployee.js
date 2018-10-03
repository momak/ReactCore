import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { actionCreators } from '../store/Employee';

class FetchEmployee extends Component {
    constructor() {
        super();
        this.state = {
            hits: [],
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        fetch('api/Employee/Index')
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong...')
                }
            })
            .then(data => this.setState({
                hits: data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error: null,
                isLoading: false
            }))
    }

    render() {
        const { hits, isLoading, error } = this.state;

        if (isLoading) {
            return <p>Loading ... </p>
        }
        if (error) {
            return <p>{error.message}</p>
        }
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {hits.map(employees =>
                        <tr key={employees.employeeId}>
                            <td>{employees.employeeId}</td>
                            <td>{employees.name}</td>
                            <td>{employees.city}</td>
                            <td>{employees.department}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
}
}
export default FetchEmployee