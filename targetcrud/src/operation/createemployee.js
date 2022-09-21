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
        // const [errors, setErrors] = useState({ Name: "", Email: "", Gender: "" });
        // // let errorTimer = 0;

        // let nameRef = useRef();
        // let emailRef = useRef();
        // let gendRef = useRef();
        // let createForm = { Name: nameRef.current.value, Email: emailRef.current.value, Gender: gendRef.current.value };
        // let errs = { Name: "", Email: "", Gender: "" };
        const data = {
            "name": employee.Name,
            "email": employee.Email,
            "gender": employee.Gender

        }
        // setErrors({ Name: "", Email: "", Gender: "" })

        // if (createForm.Name == '') {
        //     errs.Name = 'User name should not be Empty';
        // }
        // if (createForm.Email == '') {
        //     errs.Email = 'Email should not be Empty';
        // } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(createForm.Email))) {
        //     errs.Email = 'Enter a valid Email';
        // }
        // if (createForm.Gender === '') {
        //     errs.Gender = 'gender should not be empty';
        // }
        // setErrors(errs)
        // if (errs.Name != "" || errs.Email != "" || errs.Gender != "") return;
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
                                        <Form.Control type="text" name="Name" id="Name" placeholder="Name" value={employee.Name} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="Email" id="Email" placeholder="Email" value={employee.Email} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <select name="Gender" value={employee.Gender} onChange={onChange}>
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