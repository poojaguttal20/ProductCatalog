import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userEmailParam = searchParams.get("userEmail");
    setUserEmail(userEmailParam);

    const storedCartItems = localStorage.getItem(`cartItems_${userEmailParam}`);
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [location.search]);

  const updateCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    localStorage.setItem(
      `cartItems_${userEmail}`,
      JSON.stringify(updatedCartItems)
    );
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    updateCart(updatedCartItems);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productId
      );
      updateCart(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      updateCart(updatedCartItems);
    }
  };

  const calculateSubTotal = (item) =>{
    return item.price * item.quantity;
  }

  const calulateTotalPrice = () =>{
    return cartItems.reduce((total, item) => total + calculateSubTotal(item), 0);
  }

  return (
    
    <div  className="container mt-4 d-flex justify-content-center" style={{
        zIndex: 1,
        position: "relative",
        paddingBottom: "80px",
        paddingTop: "80px",
      }}>
      <div className="cart-container">
      <h2 className="cart-heading">Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <li className="cart-item" key={item.id}>
            <img src={item.images[0]} alt={item.title} className="item-image"/>
            <div className="item-details">
              <span className="product-title">{item.title}</span><br></br>
              <span className="product-price">Price: Rs.{item.price}</span><br></br>
              <span className="product-quantity">Quantity: {item.quantity}</span><br></br>
              <span className="product-subtotal"> SubTotal: Rs.{calculateSubTotal(item)}</span>
              
            </div>
            <div className="item-actions">
              <button className="quantity-button"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button className="quantity-button"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button  className="remove-button" onClick={() => removeFromCart(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-price">
          Total price: Rs.{calulateTotalPrice()}
          </div>
          </>
      )}
      </div>
    </div>
  );
}


