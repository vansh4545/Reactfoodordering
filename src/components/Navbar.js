/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/icons-material/Badge"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from 'react-redux';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useSelector((state) => state.cart)
    
    return (
        <div style ={{color:'#303030'}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Foodie</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>
                                
                                {/* <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                               
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div> */}
                                <div className="btn bg-white text-success mx-2" onClick={loadCart} style={{ position: "relative" }}>
  <ShoppingCartIcon />
  {items.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "12px",
      }}
    >
      {items.length}
    </span>
  )}
  Cart
</div>

                                
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
