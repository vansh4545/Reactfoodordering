
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../redux/slices/cartSlice';

export default function Card(props) {
  const data = useSelector((state) => state.cart);

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItem._id && item.size === size);

    if (food) {
      // If item already exists in cart with the same size, update it
      dispatch(updateItem({
        id: foodItem._id,
        qty: qty,
        price: finalPrice,
      }));
    } else {
      // If item doesn't exist, add a new one to the cart
      dispatch(addItem({
        id: foodItem._id,
        name: foodItem.name,
        qty: qty,
        size: size,
        price: finalPrice,
        img: props.ImgSrc,
      }));
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//