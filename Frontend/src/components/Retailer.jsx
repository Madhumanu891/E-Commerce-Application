import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const Retailer = () => {
    let [product, setProduct] = useState([])
    let [message, setMessage] = useState("")
    let [f, setF] = useState(true)
    let navigate = useNavigate()


    let x = Cookies.get("lc")
    let y = JSON.parse(x)


    useEffect(() => {
        if (y.token != "") {
            axios.get(`http://localhost:5000/myproducts/${y.uid}`).then((res) => {
                setProduct(res.data)
            })
        } else {
            navigate("/login")
        }
    }, [f])


    let del = (id) => {
        axios.delete(`http://localhost:5000/deleteproduct/${id}`).then((res) => {
            setMessage(res.data.message)
            setF(!f)
        })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
            <div className="text-sm text-center text-blue-600 mb-2">{message}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.isArray(product) && product.map((prodobj, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 hover:shadow-xl transition duration-300">
                        <img
                            src={`http://localhost:5000/images/${prodobj.image}`}
                            alt={prodobj.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h5 className="text-lg font-bold mb-1">{prodobj.name}</h5>
                        <h5 className="text-green-600 font-semibold mb-2">₹{prodobj.price}</h5>
                        <p className="text-gray-600 text-sm mb-4">{prodobj.description}</p>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600 transition mt-5" onClick={() => navigate(`/knowmore/${prodobj._id}`)}>Know More</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition mt-5" onClick={() => navigate(`/updateproduct/${prodobj._id}`)}>Edit</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition mt-5" onClick={() => del(prodobj._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Retailer
