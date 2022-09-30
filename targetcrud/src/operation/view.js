import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import Pagination from "./pagination/pagination";
import DataTable from 'react-data-table-component';

function View() {

    const [employees, setEmployees] = useState([]);

    // const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.gender,
        sortable: true,
    }
];

const data =[ {
    id:"",
    name:"",
    email:"",
    gender:""
}
]
    const navigate = useNavigate();

    React.useEffect((id) => {
        axios.get('http://localhost:8080/api/tutorials')
            .then(function (res) {
                console.log(res.data);
                setEmployees(res.data);
            })
    }, []);
    // const indexOfLastRecord = currentPage * recordsPerPage;
    // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    // const nPages = Math.ceil(data.length / recordsPerPage)

    const logOut = () => {
        sessionStorage.removeItem("userValidated")
        navigate("/")

    }

    const [sortState, setSortState] = useState("none");
    const sortMethods = {
        none: { method: (a, b) => null },
        ascending: { method: undefined },
        descending: { method: (a, b) => (a > b ? -1 : 1) },
    };

    onclick=(n)=>{
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("employee");
        switching = true;    
        dir = "asc";    
        while (switching) {     
          switching = false;
          rows = table.rows;
        
          for (i = 1; i < (rows.length - 1); i++) {       
            shouldSwitch = false;       
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.dangerouslySetInnerHTML.toLowerCase()) {            
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.dangerouslySetInnerHTML.toLowerCase()) {
             
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {       
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;       
            switchcount ++;
          } else {
           
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
    }

    useEffect(() => {

    }, [employees])

    const editemployee = (id) => {
        navigate({
            pathname: '/update/' + id
        });

    };

    const handleDelete = (id, i) => {

        employees.splice(i, 1);
        setEmployees(employees);
        axios.delete('http://localhost:8080/api/tutorials/' + id)
            .then((result) => {
             

            });

    }

    return (
        <Card style={{ width: 'auto' }} align="center">
            <div style={{ margin: "2rem" }}>
                <div align='right'>
                    <Button variant="secondary" onClickCapture={logOut}>Logout</Button></div>
                <h2>ACL Employees List</h2>

                <div align='right'>
                    <Button href='/create'>Create</Button>
                </div>
                <div align='right'>
                    <Col xs="12" sm="6">

                    </Col>
                </div>
                <Table striped bordered hover id='employee'>
                    <thead align="center">
                        <tr >
                            <th >Name <Button onclick={onclick}>Sort</Button> </th>
                            <th >E-Mail</th>
                            <th>Gender</th>
                            <th colSpan="2"> Actions
                            </th> 
                        </tr>
                    </thead>
                    <tbody >

                        {employees.map((employee, i) => {
                            return <tr key={i} >
                                <td>{employee.name} </td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td >
                                    <Button variant="warning" onClick={() => editemployee(employee.id)}>Edit</Button>
                                    &nbsp;</td>

                                <td>

                                    <Button onClick={() => handleDelete(employee.id, i)} variant="danger">Delete</Button>

                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>

            </div>
            {/* <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />   */}
        </Card>

    )
}

export default View;

// import DataTable from 'react-data-table-component';

// const columns = [
//     {
//         name: 'Title',
//         selector: row => row.title,
//         sortable: true,
//     },
//     {
//         name: 'Year',
//         selector: row => row.year,
//         sortable: true,
//     },
// ];

// const data =[ {
//     id: 1,
//     title: 'Beetlejuice',
//     year: '1988',
// },
// {
//     id: 2,
//     title: 'Ghostbusters',
//     year: '1984',
// },
// ]

// function MyComponent() {
//     return (
//         <DataTable
//             columns={columns}
//             data={data}
//         />
//     );
// };
// export default MyComponent;