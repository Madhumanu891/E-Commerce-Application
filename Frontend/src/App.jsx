import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ct from './components/Context';
import Nav from './components/Nav';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Cart from './components/Cart';
import Addproduct from './components/Addproduct';
import Resetpassword from './components/Resetpassword';
import Updatepassword from './components/Updatepassword';
import Cookies from 'js-cookie';

const App = () => {
  const [state, setState] = useState({ token: '', uid: '', role: '', name: '' });

  const stateupdate = (stateobj) => {
    setState({ ...state, ...stateobj });
  };

  useEffect(() => {
    const x = Cookies.get('lc');
    if (x !== undefined) {
      stateupdate(JSON.parse(x));
    }
  }, []);


  const obj = { state, stateupdate };

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Ct.Provider value={obj}>
          <Nav />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/addproduct" element={<Addproduct />} />
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/updatepassword" element={<Updatepassword />} />
            </Routes>
          </div>
        </Ct.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
