import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router';

function View() {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    React.useEffect((id) => {
        axios.get('http://localhost:8080/api/tutorials')
            .then(function (res) {
                console.log(res.data);
                setEmployees(res.data);
            })
    }, []);

    const editemployee = (id) => {
        navigate({
            pathname: '/update' + id
        });


        // =( id, name, email, gender) =>{
        // axios.setItem('Name', name);
        // axios.setItem('Mail', email);
        // axios.setItem('Gender', gender);
        // axios.setItem('ID', id);
    };

    const handleDelete = (id) => {
        console.log("",)
        axios.delete('http://localhost:8080/api/tutorials/' + id)
            .then((result) => {
                navigate('/view')
            });

    }

    return (
        <div style={{ margin: "5rem" }}>
            <h2>ACL Employees List</h2>
            <div align='right'>
                <Button href='/create'>Create</Button>
            </div>
            <Table striped bordered hover size="mb">
                
                    <tr>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Gender</th>
                        <th colSpan="2"> Actions</th>
                    </tr>
                {employees.map((employee, i) => {
                    return <tr key={i}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.gender}</td>
                        <td>
                            <Button href="/update" variant="warning" onClick={() => editemployee(employee.id)}>Edit</Button>
                            &nbsp;</td>

                        <td>
                            <Button onClick={() => handleDelete(employee.id)} variant="danger">Delete</Button>
                        </td>

                    </tr>
                })}
            </Table>
        </div>
    )
}

export default View;

