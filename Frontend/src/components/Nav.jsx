import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Ct from './Context';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const obj = useContext(Ct);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-lg pl-5">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl">
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex w-full justify-evenly text-lg">
           <Link to="/" className="font-bold hover:text-yellow-300 transition">Home</Link>
          {obj.state.token=="" &&<Link to="/register" className="font-bold hover:text-yellow-300 transition">Register</Link>}
          {obj.state.token=="" &&<Link to="/login" className="font-bold hover:text-yellow-300 transition">Login</Link>}
          {obj.state.token!="" && obj.state.role!="user" && <Link to="/addproduct" className="font-bold hover:text-yellow-300 transition">Add Product</Link>}
          {obj.state.token!="" &&<Link to="/cart" className="font-bold hover:text-yellow-300 transition">Cart</Link>}
          {obj.state.token!="" &&<Link to="/logout" className="font-bold hover:text-yellow-300 transition">Logout</Link>}
        </div>

        {obj.state.token!="" &&<div className="hidden md:block text-lg font-bold pr-10">
          {obj?.state?.name ? `${obj.state.name}` : 'Guest'}
        </div>}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black text-white space-y-2 pb-4 text-base">
          <Link to="/" className="font-bold hover:text-yellow-300" onClick={toggleMenu}>Home</Link>
          {obj.state.token=="" &&<Link to="/register" className="font-bold hover:text-yellow-300" onClick={toggleMenu}>Register</Link>}
          {obj.state.token=="" &&<Link to="/login" className="font-bold hover:text-yellow-300" onClick={toggleMenu}>Login</Link>}
          {obj.state.token!="" && obj.state.role!="user" && <Link to="/addproduct" className="font-bold hover:text-yellow-300" onClick={toggleMenu}>Add Product</Link>}
          {obj.state.token!="" &&<Link to="/cart" className="font-bold hover:text-yellow-300" onClick={toggleMenu}>Cart</Link>}
          {obj.state.token!="" &&<Link to="/logout" className="font-bold hover:text-yellow-300" onClick={toggleMenu}>Logout</Link>}
          {obj.state.token!="" &&<p className="pt-2 text-lg font-bold pr-10">
            {obj?.state?.name ? `${obj.state.name}` : 'Guest'}
          </p>}
        </div>
      )}
    </nav>
  );
};

export default Nav;
