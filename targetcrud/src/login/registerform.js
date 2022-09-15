import React, { useRef, useState } from "react";
import { Row, Col, FormGroup, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ValidatedRegisterForm() {
    const [errors, setErrors] = useState({ username: "", email: "", password: "" });
    let errorTimer = 0;

    let nameRef = useRef();
    let emailRef = useRef();
    let pwdRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let registerForm = { username: nameRef.current.value, email: emailRef.current.value, password: pwdRef.current.value };
        let errs = { username: "", email: "", password: "" };
        clearTimeout(errorTimer);
        errorTimer = setTimeout(function () {
            setErrors({ username: "", email: "", password: "" })
        }, 5000)
        if (registerForm.username == '') {
            errs.username = 'User name should not be Empty';
        }
        if (registerForm.email == '') {
            errs.email = 'Email should not be Empty';
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerForm.email))) {
            errs.email = 'Enter a valid Email';
        }
        if (registerForm.password === '') {
            errs.password = 'Password should not be empty';
        }
        setErrors(errs)
        if (errs.username != "" || errs.email != "" || errs.password != "") return;
        console.log(registerForm);
        axios.post('http://localhost:8081/api/auth/signup', registerForm)
        // .then(resp=>{
        //     console.log(resp)
        // })
        .then(data => {
        console.log(data)
        if (data.status == 200) {
            navigate("/");
            alert('Registered Successfully! Welcome');
        } else {
            alert('Registration Failed')
        }
    })
}

return (
    <div className="section" style={{ margin: "5rem" }} align="center" >
        <Row>
            <Col>
                <Card style={{ width: '25rem' }} className="bg-dark text-white" align="center"  >
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup as={Row} className="mb-3" controlId="formHorizontaluserName">
                                <Form.Label column sm={3} >Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Name"
                                    ref={nameRef}
                                />
                                {errors.username !== '' && (
                                    <div className="input-feedback">{errors.username}</div>
                                )}
                            </FormGroup>
                            <FormGroup as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3} >Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your email"
                                    ref={emailRef}
                                />
                                {errors.email !== '' && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </FormGroup>
                            <FormGroup FormGroup as={Row} className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={3}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    ref={pwdRef}
                                />
                                {errors.password !== '' && (
                                    <div className="input-feedback">{errors.password}</div>

                                )}
                            </FormGroup >
                            <div >
                                <Button type="submit" variant="light">
                                    Register  </Button>
                            </div>


                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
)
}

export default ValidatedRegisterForm;
