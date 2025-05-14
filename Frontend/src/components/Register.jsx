import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  let [data, setData] = useState({
    _id: '',
    name: '',
    password: '',
    role: '',
  });
  let [message, setMessage] = useState('');

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = () => {
    axios.post('http://localhost:5000/register', data).then((res) => {
      setMessage(res.data.message);
      setData({ _id: '', name: '', password: '', role: '' });
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>

        {message && (
          <div className="text-sm text-center text-blue-600 mb-2">{message}</div>
        )}

        <input
          type="text"
          placeholder="Enter Email"
          name="_id"
          value={data._id}
          onChange={fun}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
        />
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={data.name}
          onChange={fun}
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={fun}
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex justify-around items-center mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={data.role === 'user'}
              onChange={fun}
              className="accent-blue-600"
            />
            <span>User</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="retailer"
              checked={data.role === 'retailer'}
              onChange={fun}
              className="accent-blue-600"
            />
            <span>Retailer</span>
          </label>
        </div>

        <button
          onClick={register}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
