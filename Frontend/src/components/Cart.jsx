import React, { useContext, useEffect, useState } from 'react';
import Ct from './Context';
import axios from 'axios';

const Cart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const obj = useContext(Ct);

  useEffect(() => {
    if (obj?.state?.uid) {
      fetch();
    }
  }, [obj?.state?.uid]);

  const fetch = () => {
    const uid = obj?.state?.uid;
    axios.get(`http://localhost:5000/getcart/${uid}`).then((res) => {
      let sum = 0;
      for (let cobj of res.data) {
        sum += cobj.quantity * cobj.price;
      }
      setTotal(sum);
      setData(res.data);
    });
  };

  const increament = (pobj) => {
    axios.get(`http://localhost:5000/inc/${pobj._id}`).then(() => {
      fetch();
    });
  };

  const decrement = (pobj) => {
    if (pobj.quantity === 1) {
      del(pobj);
    } else {
      axios.get(`http://localhost:5000/dec/${pobj._id}`).then(() => {
        fetch();
      });
    }
  };

  const del = (pobj) => {
    axios.get(`http://localhost:5000/del/${pobj._id}`).then(() => {
      fetch();
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h1>

      {data.length > 0 && (
        <div className="text-center text-lg font-semibold text-blue-700 mb-6">
          Grand Total: ₹{total}
        </div>
      )}

      {data.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">🛒 Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((pobj, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={`http://localhost:5000/images/${pobj.image}`}
                alt={pobj.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h5 className="text-xl font-semibold text-gray-800 mb-1">{pobj.name}</h5>
              <h5 className="text-green-600 font-medium mb-3">₹{pobj.price}</h5>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(pobj)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-700">{pobj.quantity}</span>
                  <button
                    onClick={() => increament(pobj)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Total: ₹{pobj.quantity * pobj.price}
                </p>
              </div>

              <button
                onClick={() => del(pobj)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
              >
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
