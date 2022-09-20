// import './App.css';
import Home from "./components/home";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Add from "./components/add";
import Edit from './components/edit';
import Footer from './footer/footer';
import { Fragment } from 'react';
import Header from './header/header';
// import Login from './login/login';
import Registerform from './login/registerform';
import FormValidator from './login/validatedloginform';
import View from './operation/view';
import Createemployee from './operation/createemployee';
import Editemployee from './operation/editemployees';
import ValidatedLoginForm from "./login/validatedloginform";

function App() {
  return (
    <Fragment>
      <div>
        <Header />
      </div>

      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<FormValidator />} />
            <Route path='/registerform' element={<Registerform />} />
            <Route path='/create' element={
              <Protected>
                <Createemployee />
              </Protected>
            } />
            <Route path='/' element={<Navigate to="view" />} />
            <Route path='/view' element={
              <Protected>
                <View />
              </Protected>
            } />
            <Route path='/update/:id' element={
              <Protected>
                <Editemployee />
              </Protected>
            } />

          </Routes>
        </Router>
      </div>

      <div>
        <Footer />
      </div>

    </Fragment>


  );
}

function Protected({ children }) {
  if (sessionStorage.getItem("userValidated") == "true") return children
  return <Navigate to="/" />
}

export default App;
