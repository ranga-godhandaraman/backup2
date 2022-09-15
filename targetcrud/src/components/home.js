import React from "react";
import { Button, Table, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./employees";
import { Fragment } from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";

function Home() {

    let history = useNavigate();
    
    const handleEdit=( id, name, mail, gender) =>{
        localStorage.setItem('Name', name);
        localStorage.setItem('Mail', mail);
        localStorage.setItem('Gender', gender);
        localStorage.setItem('ID', id);
    }

    const handleDelete=(id) =>{
        var index = Employees.map(function(e){
             return e.id
            }).indexOf(id);
        
    
         Employees.splice(index,1);
    
    
        
        history('/home')
    }

    return (
        <Fragment>
             <div>
            <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/create">Create</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/registerform">Register</Nav.Link>
      </Nav.Item>
    </Nav>
            </div>
            <div style={{ margin: "5rem" }}>
            <h2>ACL Employees List Sample</h2>
            &nbsp; 
             <Link to="/create">
                    <Button>Create</Button>
                </Link>
           
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>E-mail</th>
                            <th>Gender</th>
                            <th colSpan="2"> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Employees && Employees.length > 0
                                ?
                                Employees.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.Name}
                                            </td>
                                            <td>
                                                {item.Mail}
                                            </td>
                                            <td>
                                                {item.Gender}
                                            </td>
                                            <td>
                                                <Link to= {'/edit'}>
                                                <Button variant="warning" onClick={()=> handleEdit(item.id, item.Name, item.Mail, item.Gender)}>Edit</Button>
                                                </Link>
                                                &nbsp;
                                                </td>
                                                <td>
                                                <Button variant="danger" onClick={()=> handleDelete(item.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                                : 
                                "No data found"  
                        }
                    </tbody>
                </Table>
                
            </div>
        </Fragment>
    )
}

export default Home;
