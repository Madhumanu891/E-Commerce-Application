import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Ct from './Context';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const obj = useContext(Ct);
  let navigate = useNavigate();
  const [f, setF] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/allproducts").then((res) => {
      setProduct(res.data.data);
    });
  }, [f]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios.get(`http://localhost:5000/search?query=${searchTerm}`)
        .then((res) => setFilteredProducts(res.data.data))
        .catch((err) => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);


  let addtocart = (pobj) => {
    if (obj.state.token === "") {
      navigate("/login");
    } else {
      axios.post("http://localhost:5000/addcart", {
        uid: obj.state.uid,
        pid: pobj._id,
        name: pobj.name,
        price: pobj.price,
        quantity: 1,
        image: pobj.image
      }).then(() => {
        setF(true);
        setTimeout(() => {
          setF(false);
        }, 2000)
      });
    }
  };

  const displayedProducts = searchTerm.trim() ? filteredProducts : product;

  let del = (id) => {
    axios.delete(`http://localhost:5000/deleteproduct/${id}`).then((res) => {
      setF(!f)
    })
  }

  return (
    <div className="p-4">
      {f && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg z-50" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="ml-2">Product added to cart.</span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((prodobj, index) => (
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
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600 transition mt-5" onClick={() => navigate(`/knowmore/${prodobj._id}`)}>
                Know More
              </button>
              {obj.state.token != "" && obj.state.role == "admin" && <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition mt-5" onClick={() => navigate(`/updateproduct/${prodobj._id}`)}>Edit</button>}
              {obj.state.token != "" && obj.state.role == "admin" && <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition mt-5" onClick={() => del(prodobj._id)}>Delete</button>}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
