import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Addproduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: ""
  });
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let x = Cookies.get("lc");
    if (x !== undefined) {
      const parsed = typeof x === "string" ? JSON.parse(x) : x;
      setUid(parsed.uid);
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const addProduct = () => {
    const fs = new FormData();
    for (let p in data) {
      fs.append(p, data[p]);
    }
    fs.append("rid", uid);

    axios.post("http://localhost:5000/addproduct", fs).then((res) => {
      setMessage(res.data.message);
      setData({
        name: "",
        description: "",
        category: "",
        price: "",
        image: ""
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

        {message && (
          <div className="bg-green-100 text-green-700 text-sm p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
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
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            className="w-full text-sm border border-gray-300 rounded-lg p-2"
          />
          <button
            onClick={addProduct}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
