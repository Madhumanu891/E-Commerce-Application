import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Updatepassword = () => {
  const [data, setData] = useState({})
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  let reset = () => {
    axios.post("http://localhost:5000/resetpassword", data).then((res) => {
      setMessage(res.data.message)
     if (res.data.message === "Password Reset Done") {
         setTimeout(() => navigate("/login"), 3000);
       }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          name="uid"
          onChange={fun}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter New Password"
          name="password"
          onChange={fun}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          name="otp"
          onChange={fun}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={reset}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}

export default Updatepassword
