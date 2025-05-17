import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Ct from './Context'
import axios from 'axios'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

const Knowmore = () => {
    const { pid } = useParams()
    const [product, setProduct] = useState("")
    const [f, setF] = useState(true)
    const ipt = useRef()
    const obj = useContext(Ct)
    const [value, setValue] = useState(5)
    const [hover, setHover] = useState(-1)

    useEffect(() => {
        axios.get(`http://localhost:5000/getbyid/${pid}`).then((res) => {
            setProduct(res.data)
        })
    }, [f])

    const add = () => {
        if (!ipt.current.value.trim()) return alert("Comment cannot be empty.")
        axios.post("http://localhost:5000/addcomment", {
            pid,
            name: obj.state.name,
            text: ipt.current.value,
            rating: value
        }).then(() => {
            ipt.current.value = ""
            setValue(5)
            setF(!f)
        })
    }

    console.log("TOKEN:", obj.state.token)

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-6xl">
                {product && (
                    <div className="flex flex-col lg:flex-row gap-x-10">
                        {/* Product Details */}
                        <div  className="lg:w-1/2 w-full">
                            <img
                                src={`http://localhost:5000/images/${product.image}`}
                                alt="Product"
                                className="w-full h-64 object-cover rounded-xl mb-6"
                            />
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">Name: {product.name}</h2>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">Description:</span> {product.description}</p>
                            <p className="text-gray-700 mb-2"><span className="font-semibold">Price:</span> ₹{product.price}</p>
                            <p className="text-gray-700 mb-6"><span className="font-semibold">Category:</span> {product.category}</p>

                            {product.comments.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments:</h3>
                                    <div className="space-y-4">
                                        {product.comments.map((com, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                                                <p className="font-semibold text-gray-800">Name: {com.name}</p>
                                                <p className="text-gray-700 mb-1">Comment: {com.text}</p>
                                                <Rating name="read-only" value={com.rating} precision={0.5} readOnly />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add Comment Section */}
                        {obj.state.token && (
                            <div className="lg:w-1/2 w-full bg-gray-50 p-6 rounded-2xl shadow">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Comment:</h3>
                                <input
                                    type="text"
                                    placeholder="Enter the Comment Text"
                                    ref={ipt}
                                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => setValue(newValue)}
                                    onChangeActive={(event, newHover) => setHover(newHover)}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <button
                                    onClick={add}
                                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Add Comment
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Knowmore
