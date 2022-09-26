import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Createemployee(props) {
    const [employee, setemployee] = useState({ name: '', email: '', gender: '' });
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/api/tutorials";
    
    const [errors, setErrors] = useState({ name: "", email: "", gender: "" });
    let nameRef = useRef();
    let emailRef = useRef();
    let gendRef = useRef();
   

    const Insertemployee = (e) => {
        e.preventDefault();
        const data = {
            "name": employee.name,
            "email": employee.email,
            "gender": employee.gender

        }
        let createForm = { name: nameRef.current.value, email: emailRef.current.value, gender: gendRef.current.value };
        let errs = { name: "", email: "", gender: "" };
        // let errorTimer = 0;   
        setErrors({ name: "", email: "", gender: "" })

        if (createForm.name == '') {
            errs.name = 'User name should not be Empty';
        }
        if (createForm.email == '') {
            errs.email = 'Email should not be Empty';
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(createForm.email))) {
            errs.email = 'Enter a valid Email';
        }
        if (createForm.gender === '') {
            errs.gender = 'gender should not be empty';
        }
        setErrors(errs)
        if (errs.name != "" || errs.email != "" || errs.gender != "") return;
        axios.post(apiUrl, data)
            .then((result) => {
                navigate('/view')
            });
        // clearTimeout(errorTimer);
        // errorTimer = setTimeout(function () {


    };
    const onChange = (e) => {

        setemployee({ ...employee, [e.target.name]: e.target.value });
        
    }

    return (
        <div className="section" style={{ margin: "5rem" }} align="center" >
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mb-3" style={{ width: '25rem' }}>
                            <Card.Body className="p-4">
                                <Form onSubmit={Insertemployee}>
                                    <h1>Create Employee</h1>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="name" id="name" placeholder="Name" value={employee.name} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="email" id="email" placeholder="Email" value={employee.email} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <select name="gender" value={employee.gender} onChange={onChange}>
                                            <option id="gender">Gender</option>
                                            <option id="Male">Male</option>
                                            <option id="Female">Female</option>
                                            <option id="Others">Others</option>
                                        </select>
                                    </Form.Group>


                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button type="submit" variant="success" >Save</Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button href='/view' variant="danger">Cancel</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>

    )

}

export default Createemployee