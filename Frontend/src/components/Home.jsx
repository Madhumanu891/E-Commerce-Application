import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Ct from './Context';
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [product, setProduct] = useState([]);
  const obj = useContext(Ct)
  let navigate = useNavigate()
  const [f, setF] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:5000/allproducts").then((res) => {
      setProduct(res.data.data);
    });
  }, []);

  let addtocart = (pobj) => {
    if (obj.state.token == "") {
      navigate("/login")
    }
    else {
      axios.post("http://localhost:5000/addcart", { "uid": obj.state.uid, "pid": pobj._id, "name": pobj.name, "price": pobj.price, "quantity": 1, "image": pobj.image }).then((res) => {
        setF(true)
      })
    }
  }

  return (
    <div className="p-4">

      {f && <div><p>Product Added To Cart</p>
        <button onClick={() => setF(false)}>X</button>
      </div>}
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition" onClick={() => addtocart(prodobj)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
