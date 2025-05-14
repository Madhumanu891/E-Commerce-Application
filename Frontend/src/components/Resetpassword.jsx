import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Resetpassword = () => {
  const [uid, setUid] = useState("")
  const [message, setMessage] = useState("")

  const fun = (e) => {
    setUid(e.target.value)
  }

  const send = () => {
    axios.get(`http://localhost:5000/sendotp/${uid}`).then((res) => {
      setMessage(res.data.message)
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600 font-medium">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          name="uid"
          onChange={fun}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={send}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <Link to="/updatepassword">Send OTP</Link>
        </button>
      </div>
    </div>
  )
}

export default Resetpassword
