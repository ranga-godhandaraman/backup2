import React, { useState } from 'react';
import { Button, Form, Card, Nav } from "react-bootstrap";
import Employees from "./employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Add() {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [gender, setGender] = useState('');

    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("The Data will be Added to the Table, Press OK to continue");
        const ids = uuid();
        let uniqueId = ids.slice(0, 8);

        let a = name,
            b = mail,
            c = gender;

        Employees.push({ id: uniqueId, Name: a, Mail: b, Gender: c });
        history("/home");
    }
    return( 
    <div className="section" style={{ margin: ".75rem" }} align="center" >
        <div>
        <Nav variant="pills" defaultActiveKey="/create">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/create">Create</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/registerform">Register</Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
    <div>
        <Card style={{ width: '50%' }} border="success">
            <h2>Add Data to the List</h2>
            <Form onSubmit={(e) => handleSubmit(e)} className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMail">
                    <Form.Control type="text" placeholder="Enter Mail ID" required onChange={(e) => setMail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGender">
                    <Form.Control type="text" placeholder="Enter Gender" required onChange={(e) => setGender(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="success"> Submit </Button>

            </Form>
            </Card>
            </div>
    </div>
    )
}
export default Add;