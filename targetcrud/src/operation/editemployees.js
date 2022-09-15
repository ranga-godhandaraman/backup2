import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Editemployee(props) {
    const [employee, setemployee] = useState({ name: '', email: '', gender: '' });

    const navigate = useNavigate();
    const Url = "http://localhost:8080/api/tutorials";

    useEffect((id) => {
        const GetData = async () => {
            const result = await axios(Url);
            console.log("",)
            setemployee(result.data);
        };
        GetData();
    }, []);
    const UpdateEmployee = (e) => {
        e.preventDefault();
        const data = { Name: employee.name, Email: employee.email, Gender: employee.gender };
        axios.post(Url, data)
            .then((result) => {
                navigate('/view')
            });
    };


    const onChange = (e) => {
        e.persist();
        // debugger;
        setemployee({ ...employee, [e.target.name]: e.target.value });
    }

    return (
        <div className="section" style={{ margin: "5rem" }} align="center" >
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                    <Card className="mb-3" style={{ width: '25rem' }}>
                            <Card.Body className="p-4">
                                <Form onSubmit={UpdateEmployee}>
                                    <h1>Update Employee</h1>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="Name" id="Name" placeholder="Name" value={employee.name} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="Email" id="Email" placeholder="Email" value={employee.email} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control type="text" placeholder="Gender" name="Gender" id="Gender" value={employee.gender} onChange={onChange} />
                                    </Form.Group>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button type="submit" variant="primary" >Update</Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button  href="/view" variant="danger" >Cancel</Button>
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

};

export default Editemployee