import React, { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Editemployee() {
    const [employee, setEmployee] = useState({ Name: '', Email: '', Gender: '' });
    let { id } = useParams();
    const navigate = useNavigate();
    const Url = "http://localhost:8080/api/tutorials/"+id;

    const [errors, setErrors] = useState({ name: "", email: "", gender: "" });
    let nameRef = useRef();
    let emailRef = useRef();
    let gendRef = useRef();
    let errorTimer = 0;

     
    const GetData = async () => {
        const result = await axios(Url);
        console.log(result);
        setEmployee(result.data);
    };

    useEffect((id) => {
        GetData();
    }, []);
    const UpdateEmployee = (e) => {
        e.preventDefault();
        console.log(employee);
        const data = {
            "name": employee.Name,
            "email": employee.Email,
            "gender": employee.Gender

        }
        let createForm = { name: nameRef.current.value, email: emailRef.current.value, gender: gendRef.current.value };
        let errs = { name: "", email: "", gender: "" };
        clearTimeout(errorTimer);
        errorTimer = setTimeout(function () {
            setErrors({ email: "", password: "" })
        }, 5000)   
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
        
        axios.put(Url, data)
            .then((result) => {
                navigate('/view')
            });
    };


    const onChange = (e) => {
        console.log(e);
        // e.persist();
        // debugger;
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    return (
        <div className="section" style={{ margin: "5rem" }} align="center" >
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mb-3" style={{ width: '25rem' }}>
                            <Card.Body className="p-4">
                                <form onSubmit={UpdateEmployee}>
                                    <h1>Update Employee</h1>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="Name" id="Name" placeholder="Name"
                                            defaultValue={employee.name} onChange={onChange}
                                            ref={nameRef} />
                                            {errors.nmae !== '' && (
                                        <div className="input-feedback">{errors.name }</div>
                                    )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="Email" id="Email" placeholder="Email"
                                            defaultValue={employee.email} onChange={onChange}
                                            ref={emailRef} />
                                        {errors.email !== '' && (
                                            <div className="input-feedback">{errors.email}</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <select name="Gender" value={employee.Gender} onChange={onChange} ref={gendRef}>
                                            <option id="gender">Gender</option>
                                            <option id="Male">Male</option>
                                            <option id="Female">Female</option>
                                            <option id="Others">Others</option>
                                        </select>{errors.gender !== '' && (
                                        <div className="input-feedback">{errors.gender}</div>
                                    )}
                                    </Form.Group>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button type="submit" variant="primary" >Update</Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button href="/view" variant="danger" >Cancel</Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )

};

export default Editemployee