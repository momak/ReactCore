import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FetchEmployee extends Component {
    constructor() {
        super();
        this.state = {
            employeeArr: [],
            isLoading: false,
            error: null
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
                employeeArr: data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error: null,
                isLoading: false
            }))
    }

    // Handle Delete request for an employee  
    handleDelete(id: number) {
        /* global location */
        /* eslint no-restricted-globals: ["off", "location"] */
        if (!confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/Employee/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        employeeArr: this.state.employeeArr.filter((rec) => {
                            return (rec.employeeId !== id);
                        })
                    });
            });
        }
    }
    handleEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }

    render() {
        const { employeeArr, isLoading, error } = this.state;

        if (isLoading) {
            return <p>Loading ... </p>
        }
        if (error) {
            return <p>{error.message}</p>
        }
        return (
            <div>
                <h1>Employee Data</h1>
                <p>This component demonstrates fetching Employee data from the server.</p>
                <p>
                    <Link to="/addemployee">Create New</Link>
                </p>
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
                        {employeeArr.map(emp =>
                            <tr key={emp.employeeId}>
                                <td>{emp.employeeId}</td>
                                <td>{emp.name}</td>
                                <td>{emp.city}</td>
                                <td>{emp.department}</td>
                                <td>
                                    <a className="action" onClick={(id) => this.handleEdit(emp.employeeId)}>Edit</a>  |
                                <a className="action" onClick={(id) => this.handleDelete(emp.employeeId)}>Delete</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default FetchEmployee


export class EmployeeData {
    employeeId: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}