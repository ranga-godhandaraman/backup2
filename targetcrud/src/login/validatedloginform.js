import React, { useRef, useState, useContext, createContext } from "react";
import { Row, Col, FormGroup, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import "./registration.css"


function ValidatedLoginForm() {

    const [errors, setErrors] = useState({ email: "", password: "" });
    let errorTimer = 0;

    const navigate = useNavigate();

    let emailRef = useRef();
    let pwdRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        let loginForm = { email: emailRef.current.value, password: pwdRef.current.value };
        let errs = { email: "", password: "" };
        clearTimeout(errorTimer);
        errorTimer = setTimeout(function () {
            setErrors({ email: "", password: "" })
        }, 5000)
        if (loginForm.email == '') {
            errs.email = 'Email should not be empty';
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginForm.email))) {
            errs.email = 'Enter a valid Email';
        }
        if (loginForm.password === '') {
            errs.password = 'Password should not be empty';
        }
        setErrors(errs)
        if (errs.email != "" || errs.password != "") return;
        axios.post('http://localhost:8081/api/auth/signin', loginForm)
            .then(data => {
                console.log(data)
                if (data.status == 200) {
                    sessionStorage.setItem("userValidated", true);
                    navigate("/view");
                    alert('Congrats! You have Loggedin Successfully');
                } else {
                    sessionStorage.setItem("userValidated", false);
                    alert('Login Failed');
                }
            })
    }


    return (
        <div className="section" style={{ margin: "5rem" }} align="center" >
            <Row>
                <Col>
                    <Card style={{ width: '25rem' }} >
                        <Card.Body class='p-4' >
                            <Form onSubmit={handleSubmit}>
                                <h3>Sign In</h3>
                                <FormGroup as={Row} className="mb-3" controlId="formHorizontalEmail" align="left">
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
                                <FormGroup FormGroup as={Row} className="mb-3" controlId="formHorizontalPassword" align="left">
                                    <Form.Label column sm={4}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        ref={pwdRef}
                                    />
                                    {errors.password !== '' && (
                                        <div className="input-feedback">{errors.password}</div>

                                    )}
                                </FormGroup >
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="primary"
                                    >Sign In  </Button>
                                </div>
                                Not Registered yet?
                            <Button padding="10px" variant="link" href="/registerform"> <h6>Sign Up </h6></Button>


                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ValidatedLoginForm;

