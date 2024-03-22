import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { renderRating } from "../store/helpers";
import { useContext } from "react";
import { DataContext } from "../store/DataStore";
import { useState } from "react";

export default function Products({
  user,
  // products,
  // fetchData,
  handleButtonClick,
}) {
  const { products, fetchData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsperPage] = useState(9);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const userEmail = user.email;
    const cartItems = JSON.parse(localStorage.getItem(`cartItems_${userEmail}`)) || [];
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(`cartItems_${userEmail}`, JSON.stringify(cartItems));
    window.location.href = `/cart?userEmail=${userEmail}&productId=${product.id}`;

  };

  const handleAddToWishList = (e, product) => {
    e.preventDefault();
    const userEmail = user.email;
    const wishItems = JSON.parse(localStorage.getItem(`wishlistItems_${userEmail}`)) || [];
    const existingItemIndex = wishItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      alert("This item is already in your wishlist");
    } else {
      const updatedWishItems = [...wishItems, product]
      localStorage.setItem(`wishlistItems_${userEmail}`, JSON.stringify(updatedWishItems));
      window.location.href = `/wish?userEmail=${userEmail}&productId=${product.id}`;
    }

  }


  useEffect(() => {
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [fetchData, loading]);

  const indexOfLastItem = currentPage * itemsperPage;
  const indexofFirstItem = indexOfLastItem - itemsperPage;
  const currentProducts = products.slice(indexofFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {!user ? (
        <div className="container mt-4" style={{
          zIndex: 1,
          position: "relative",
          paddingBottom: "80px",
          paddingTop: "80px",
        }}>
          <div className="row">
            {currentProducts.map((product) => (
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
                      <span style={{ color: "#FD5F07", fontWeight: "bold" }}>
                        Rs.{product.price}
                      </span>
                    </p>
                    <p className="card-text">{renderRating(product.rating)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
        <div className="container mt-4">
          <div className="row">
            {currentProducts.map((product) => (
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
              
                    {user && user.admin ? (
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
                    ) : ( user && (<div className="d-flex justify-content-between align-items-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-block btn-primary"
                      
                    >
                      Details
                    </Link>
                    <button className="btn btn-block btn-primary" onClick={(e) => handleAddToCart(e, product)}>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <button className="btn btn-block btn-danger" onClick={(e) => handleAddToWishList(e, product)}>
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>)
                      
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>)}
       <nav>
          <ul className="pagination">
            {Array.from({length:Math.ceil(products.length / itemsperPage)}, (_, i) => (
              <li key={i} className="page-item">
                  <button onClick={() => paginate(i + 1)} className="page-link">{i+1}</button>
              </li>
            ))}
          </ul>
        </nav>
    </>
  );
}
