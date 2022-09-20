import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Editemployee() {
    const [employee, setEmployee] = useState({ Name: '', Email: '', Gender: '' });
    let { id } = useParams();
    const navigate = useNavigate();
    const Url = "http://localhost:8080/api/tutorials/"+id;
     
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
            "name": employee.name,
            "email": employee.email,
            "gender": employee.gender

        }
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
                                        <Form.Control type="text" name="name" id="name" placeholder="Name" defaultValue={employee.name} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="email" id="email" placeholder="Email" defaultValue={employee.email} onChange={onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Control type="text" placeholder="gender" name="gender" id="Gender" defaultValue={employee.gender} onChange={onChange} />
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