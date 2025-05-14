import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ct from './Context';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  let [data, setData] = useState({ _id: '', password: '' });
  let [message, setMessage] = useState('');
  let navigate = useNavigate();
  let obj = useContext(Ct);

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = () => {
    axios.post('http://localhost:5000/login', data).then((res) => {
      if (res.data.token !== undefined) {
        Cookies.set('lc', JSON.stringify(res.data), { expires: 2 });
        obj.stateupdate(res.data);
        navigate('/');
      } else {
        setMessage(res.data.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Login</h2>

        {message && (
          <div className="text-red-500 text-sm text-center mb-4">
            {message}
          </div>
        )}

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Enter Email"
            name="_id"
            value={data._id}
            onChange={fun}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={data.password}
            onChange={fun}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
