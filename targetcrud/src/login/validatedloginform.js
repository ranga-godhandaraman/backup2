// import React, {  } from "react";
import React, { useRef, useState, useContext, createContext } from "react";
import { Row, Col, FormGroup, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";


// const fakeAuth = {
//     isAuthenticated: false,
//     signin(cb) {
//         fakeAuth.isAuthenticated = true;
//         setTimeout(cb, 100); // fake async
//     },
//     signout(cb) {
//         fakeAuth.isAuthenticated = false;
//         setTimeout(cb, 100);
//     }
// };

// const authContext = createContext();

// function ProvideAuth({ children }) {
//     const auth = useProvideAuth();
//     return (
//         <authContext.Provider value={auth}>
//             {children}
//         </authContext.Provider>
//     );
// }

// function useAuth() {
//     return useContext(authContext);
// }

// function useProvideAuth() {
//     const [user, setUser] = useState(null);

//     const signin = cb => {
//         return fakeAuth.signin(() => {
//             setUser("user");
//             cb();
//         });
//     };
//     const signout = cb => {
//         return fakeAuth.signout(() => {
//             setUser(null);
//             cb();
//         });
//     };

//     return {
//         user,
//         signin,
//         signout
//     };
    
// }
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
        // console.log(loginForm);
        axios.post('http://localhost:8081/api/auth/signin', loginForm)
            // .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if (data.status == 200) {
                    navigate("/view");
                    alert('Congrats! You have Loggedin Successfully');
                } else {
                    alert('LoginFailed')
                }
            })


    }


    return (
        <div className="section" style={{ margin: "5rem" }} align="center" >
            <Row>
                <Col>
                    <Card style={{ width: '25rem' }} className="bg-primary text-white" >
                        <Card.Body class='p-4' >
                            <Form onSubmit={handleSubmit}>
                                <FormGroup as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2} >Email</Form.Label>
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
                                        Login   </Button>
                                </div>


                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ValidatedLoginForm;

