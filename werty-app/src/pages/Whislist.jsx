import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { renderRating } from "../store/helpers";
import "./Wishlist.css";

export default function Wishlist() {
   const location = useLocation();
   const [userEmail, setUserEmail] = useState("");
   const [wishlistItems, setWishlistItems] = useState([]);
   

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userEmailParam = searchParams.get("userEmail");
    setUserEmail(userEmailParam);
    const storedWishlistItems = localStorage.getItem(`wishlistItems_${userEmailParam}`);
    if (storedWishlistItems) {
      setWishlistItems(JSON.parse(storedWishlistItems));
    }
  }, [location.search]);

  const removeFromWishlist = (productId) => {
    const updatedWishlistItems = wishlistItems.filter(
      (item) => item.id !== productId
    );

    updateWishlist(updatedWishlistItems);
  };

  const updateWishlist = (updatedWishlistItems) => {
    setWishlistItems(updatedWishlistItems);

    localStorage.setItem(
      `wishlistItems_${userEmail}`,
      JSON.stringify(updatedWishlistItems)
    );
  };

  return (
    <div className="container mt-4"
    style={{
      zIndex: 1,
      position: "relative",
      paddingBottom: "80px",
      paddingTop: "80px",
    }}>
      <div className="wishlist-container">
      <h2 className="wishlist-title">Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul className="wishlist-list">
          {wishlistItems.map((item) => (
            <li className="wishlist-item" key={item.id}>
              <img src={item.images[0]} alt={item.title}/><br></br>
              <div className="wishlist-details">
              <span className="wishlist-name">{item.title}</span><br></br>
              <span className="wishlist-price">Price: Rs.{item.price}</span><br></br>
              <span className="wishlist-rating">Rating{renderRating(item.rating)}</span><br></br>
              <button className="wishlist-remove-button" onClick={() => removeFromWishlist(item.id)}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
              </div>
             
              
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}


