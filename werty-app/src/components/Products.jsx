import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


export default function Products({user, products, fetchData, handleButtonClick}) {

  useEffect(()=>{
    fetchData();
  }, [fetchData]);

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} style={{ color: "gold" }} />
        );
      } else {
        stars.push(<FontAwesomeIcon icon={faStar} key={i} style={{color:"grey"}}/>);
      }
    }
    return stars;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
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
                    <span style={{color:"#FD5F07", text:"bold"}}>Rs.{product.price}</span>
                </p>
                <p className="card-text">{renderRating(product.rating)}</p>
                {/* <p className="card-text">Quantity: {product.stock}</p>
                <p className="card-text">
                  Discount: {product.discountPercentage}
                </p>
                <p className="card-text">Category:{product.category}</p> */}
                {user.admin ? (
                    <div className="d-flex justify-content-between align-items-center">
                     <button className="btn btn-block btn-primary" onClick={()=>handleButtonClick('edit', product.id)}>Edit</button>
                     <button className="btn btn-block btn-danger" onClick={()=>handleButtonClick('delete', product.id)}>Delete</button>

                    </div>
                ): (
                    <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-block btn-primary" >Add to Cart</button>
                     <button className="btn btn-block btn-danger" >Add to Whislist</button>
                    </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
