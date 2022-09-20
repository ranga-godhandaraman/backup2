import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Createemployee(props) {
    const [employee, setemployee] = useState({ Name: '', Email: '', Gender: '' });
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8080/api/tutorials";

    const Insertemployee = (e) => {
        e.preventDefault();
        // const [errors, setErrors] = useState({ name: "", email: "", gender: "" });
        // let errorTimer = 0;
        // let nameRef = useRef();
        // let emailRef = useRef();
        // let gendRef = useRef();


        // let createForm = { username: nameRef.current.value, email: emailRef.current.value, gender: gendRef.current.value };
        // let errs = { username: "", email: "", gender: "" };

        const data = {
            "name": employee.Name,
            "email": employee.Email,
            "gender": employee.Gender

        }


        // clearTimeout(errorTimer);
        // errorTimer = setTimeout(function () {
        //     setErrors({ username: "", email: "", gender: "" })
        // }, 5000)
        // if (createForm.username == '') {
        //     errs.username = 'User name should not be Empty';
        // }
        // if (createForm.email == '') {
        //     errs.email = 'Email should not be Empty';
        // } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(createForm.email))) {
        //     errs.email = 'Enter a valid Email';
        // }
        // if (createForm.gender === '') {
        //     errs.gender = 'gender should not be empty';
        // }
        // setErrors(errs)
        // if (errs.username != "" || errs.email != "" || errs.gender != "") return;
        axios.post(apiUrl, data)
            .then((result) => {
                navigate('/view')
            });
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
                                        <Form.Control type="text" name="Name" id="Name" placeholder="Name" value={employee.Name} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="Email" id="Email" placeholder="Email" value={employee.Email} onChange={onChange} />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-4">
                                        <Form.Control type="text" placeholder="Gender" name="Gender" id="Gender" value={employee.Gender} onChange={onChange} />
                                    </Form.Group> */}
                                    <Form.Group>
                                    <Dropdown
                                        id="Gender"
                                        label="Gender"
                                        options={[
                                            { label: 'Male', value: 'Male' },
                                            { label: 'Female', value: 'Female' },
                                            { label: 'Others', value: 'Others' },
                                        ]}
                                        value={employee.Gender}
                                        onChange={onChange}
                                    />
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