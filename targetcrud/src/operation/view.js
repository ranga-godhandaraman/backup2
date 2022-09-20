import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table,Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

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
    const logOut =()=>{
        sessionStorage.removeItem("userValidated")
        navigate("/")

    }


    useEffect(() => {

    }, [employees])

    const editemployee = (id) => {
        navigate({
            pathname: '/update/' + id
        });
        
    };

    const handleDelete = (id, i) => {

        employees.splice(i, 1);
        setEmployees(employees);
        axios.delete('http://localhost:8080/api/tutorials/' + id)
            .then((result) => {
                // navigate('/view')
                alert('Successfully Deleted');
                window. location. reload(false);

            });

    }
    // 
    return (
        <Card style={{ width: 'auto' }} align="center">
            <div style={{ margin: "2rem" }}>
            <div align='right'>
                <Button variant="secondary"  onClickCapture={logOut}>Logout</Button></div>
                <h2>ACL Employees List</h2>
                
                <div align='right'>
                    <Button href='/create'>Create</Button>
                </div>
                <div align='right'>
                <Col xs="12" sm="6">
                   
                    </Col>
                </div>
                <Table striped bordered hover >
                    <thead align="center">
                        <tr>
                            <th>Name</th>
                            <th>E-Mail</th>
                            <th>Gender</th>
                            <th colSpan="2"> Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {employees.map((employee, i) => {
                            return <tr key={i} >
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td >
                                    <Button variant="warning" onClick={() => editemployee(employee.id)}>Edit</Button>
                            &nbsp;</td>

                                <td>
                                
                                    <Button onClick={() => handleDelete(employee.id, i)} variant="danger">Delete</Button>
                            
                                </td>

                            </tr>
                        })}
                    </tbody>
                </Table>

            </div>
        </Card>
    )
}

export default View;

