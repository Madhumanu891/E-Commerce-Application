import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie"

const Updateproduct = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        price: ""
    });
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [uid, setUid] = useState("")

    let { _id } = useParams()

    useEffect(() => {
        let x = Cookies.get("lc");
        if (x !== undefined) {
            const parsed = typeof x === "string" ? JSON.parse(x) : x;
            setUid(parsed.uid);
        } else {
            navigate("/login");
        }

        axios.get(`http://localhost:5000/getproduct/${_id}`).then((res) => {
            console.log(res.data)
            setData(res.data)
        })

    }, []);



    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    let update = () => {
        axios.put(`http://localhost:5000/updateproduct/${_id}`, data).then((res) => {
            console.log(res)
            setMessage(res.data.message)
            setData({
                name: "",
                description: "",
                category: "",
                price: ""
            })
            navigate("/")
        })
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Update Product</h2>

                {message && (
                    <div className="text-center text-sm text-green-600 mb-4">
                        {message}
                    </div>
                )}

                <div className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Product Name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter Description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter Category"
                        value={data.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Enter Price"
                        value={data.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={update}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Updateproduct
