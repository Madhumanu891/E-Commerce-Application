import React, { useContext, useEffect, useState } from 'react';
import Ct from './Context';
import axios from 'axios';

const Cart = () => {
  const [data, setData] = useState([]);
  const obj = useContext(Ct);


  useEffect(() => {
    console.log("Context:", obj);

    if (obj?.state?.uid) {
      fetch();
    }
  }, [obj?.state?.uid])


  let fetch = () => {
    const uid = obj?.state?.uid;
    if (!uid) {
      console.warn('UID is missing, cannot fetch cart.');
      return;
    }
    axios.get(`http://localhost:5000/getcart/${obj.state.uid}`).then((res) => {
      setData(res.data);
    })

  }

  let increament = (pobj) => {
    axios.get(`http://localhost:5000/inc/${pobj._id}`).then((res) => {
      fetch()
      console.log(res.data)
    })
  }

  let decrement = (pobj) => {
    if (pobj.quantity === 1) {
      del(pobj);
    } else {
      axios.get(`http://localhost:5000/dec/${pobj._id}`).then(() => {
        fetch()
      });
    }
  };

  let del = (pobj) => {
    axios.get(`http://localhost:5000/del/${pobj._id}`).then((res) => {
      fetch()
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((pobj, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 hover:shadow-sm transition duration-300"
            >
              <img
                src={`http://localhost:5000/images/${pobj.image}`}
                alt="product"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h5 className="text-lg font-bold mb-1">{pobj.name}</h5>
              <h5 className="text-green-600 font-semibold mb-2">
                ₹{pobj.price}
              </h5>

              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2">
                  <button className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400" onClick={() => decrement(pobj)}>-</button>
                  <span className="px-2">{pobj.quantity}</span>
                  <button className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400" onClick={() => increament(pobj)}>+</button>
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Total: ₹{pobj.quantity * pobj.price}
                </p>
              </div>

              <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition" onClick={() => del(pobj)}>
                Delete Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
