import './App.css';
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Add from "./components/add";
import Edit from './components/edit';
import Footer from './footer/footer';
import { Fragment } from 'react';
import Header from './header/header';
// import Login from './login/login';
import Registerform from './login/registerform';
import  FormValidator from './login/validatedloginform';
import View from './operation/view';
import Createemployee from './operation/createemployee';
import Editemployee from './operation/editemployees';

function App() {
  return (
    <Fragment>
      <div>
        <Header/>
      </div>

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<FormValidator/>}/> 
          <Route path='/create' element={<Createemployee/>}/>
          {/* <Route path='/edit' element={<Edit/>}/> */}
          <Route path='/home' element={<Home/>}/>
          <Route path='/registerform' element={<Registerform/>}/>
          <Route path='/view' element={<View/>}/>
          <Route path='/update' element={<Editemployee/>}/>
          
        </Routes>
      </Router>
    </div>
    
    <div>
      <Footer/>
    </div>
    
    </Fragment>
  
    
  );
}

export default App;
