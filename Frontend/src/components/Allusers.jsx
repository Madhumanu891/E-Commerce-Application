import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Allusers = () => {
    const [data, setData] = useState([]);
    const [f, setF] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/allusers").then((res) => {
            setData(res.data);
            console.log(res)
        });
    }, [f]);

    const del = (id) => {
        axios.delete(`http://localhost:5000/deleteuser/${id}`).then((res) => {
            setMessage(res.data.message)
            setF(!f)
        })
    }


    return (
        <div className="p-4 min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-center mb-6">All Users</h2>

            {message && (
                <div className="text-sm text-center text-blue-600 mb-2">{message}</div>
            )}

            {data.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full table-auto bg-white border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border">S.No</th>
                                <th className="px-4 py-2 border">User ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors">
                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border text-center">{item._id}</td>
                                    <td className="px-4 py-2 border text-center">{item.name}</td>
                                    <td className="px-4 py-2 border text-center">{item.role}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={()=>del(item._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No users found.</p>
            )}
        </div>
    );
};

export default Allusers;
