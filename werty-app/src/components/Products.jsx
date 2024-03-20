import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { renderRating } from "../store/helpers";
// import { useContext } from "react";
// import { DataContext } from "../store/DataStore";
import { useState } from "react";

export default function Products({
  user,
  products,
  fetchData,
  handleButtonClick,
}) {
  // const {products, fetchData} = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const userEmail = user.email;
    const cartItems = JSON.parse(localStorage.getItem(`cartItems_${userEmail}`)) || [];
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if(existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(`cartItems_${userEmail}`,JSON.stringify(cartItems));
    window.location.href = `/cart?userEmail=${userEmail}&productId=${product.id}`;

   
  };

  useEffect(() => {
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [fetchData, loading]);

  return (
    <>
    <Link to={`/cart?userEmail=${user.email}`} className="btn" style={{backgroundColor:"#FD5F07",position:"fixed", marginBottom:"3px", marginLeft:"1120px", zIndex:999}}><FontAwesomeIcon icon={faShoppingCart} /></Link>
      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    <span style={{ color: "#FD5F07", text: "bold" }}>
                      Rs.{product.price}
                    </span>
                  </p>
                  <p className="card-text">{renderRating(product.rating)}</p>
                  {/* <p className="card-text">Quantity: {product.stock}</p>
                <p className="card-text">
                  Discount: {product.discountPercentage}
                </p>
                <p className="card-text">Category:{product.category}</p> */}
                  {user.admin ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-block btn-primary"
                        onClick={() => handleButtonClick("edit", product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-block btn-danger"
                        onClick={() => handleButtonClick("delete", product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-block btn-primary"
                      >
                        Details
                      </Link>
                      <button className="btn btn-block btn-primary" onClick={(e) => handleAddToCart(e, product)}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                      <button className="btn btn-block btn-danger">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
