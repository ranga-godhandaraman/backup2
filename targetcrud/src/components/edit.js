import React, { useState, useEffect } from 'react';
import { Button, Form,Card } from "react-bootstrap";
import Employees from "./employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [gender, setGender] = useState('');
    const [id, setId] = useState('');

    let history = useNavigate();

    var index = Employees.map(function(e) {
        return e.id
    }).indexOf(id);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("The Data is modified, Press OK to continue");
        
         let a = Employees[index];
        a.Name = name;
        a.Mail = mail;
        a.Gender = gender;

        history("/home");
    }

    useEffect(() =>{
        setName(localStorage.getItem('Name'));
        setMail(localStorage.getItem('Mail'));
        setGender(localStorage.getItem('Gender'));
        setId(localStorage.getItem('ID'));

    },[])
    
    return (
        
        <div className="section" style={{ margin: ".75rem" }} align="center" >
        <Card style={{ width: '50%' }} border="warning">
            <h2>Update Data to the List</h2>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMail">
                    <Form.Control type="text" placeholder="Enter Mail ID" value={mail} onChange={(e) => setMail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGender">
                    <Form.Control type="text" placeholder="Enter Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button onClick={(e)=> handleSubmit(e)} type="submit" variant="warning"> Update </Button>
            </Form>
            </Card>
        </div>
    )
}

export default Edit;