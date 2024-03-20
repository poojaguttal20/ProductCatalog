import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css';
import { renderRating } from "../store/helpers";

export default function ProductDetail() {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        const fetchDetailedProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/getproduct/${productId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setProductDetail(data);
                } else {
                    console.log("Failed to fetch product details");
                }
            } catch (error) {
                console.log("Error fetching product details", error);
            }
        };
        fetchDetailedProduct();
    }, [productId]);

    return (
        <div className="container mt-4"
        style={{
          zIndex: 1,
          position: "relative",
          paddingBottom: "80px",
          paddingTop: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            {productDetail ? (
                <div className="product-conatiner">
                    <img
                        src={productDetail.images[0]}
                        alt={productDetail.title}
                        className="product-image"
                    />
                    <h2 className="product-title">{productDetail.title}</h2>
                    <div className="product-details">
                        <p className="product-detail">Quantity: {productDetail.stock}</p>
                        <p className="product-detail">Category: {productDetail.category}</p>
                    </div>
                    <p className="offer-price">Offer Price: Rs. {productDetail.discountPercentage}</p>
                    <p className="product-price">Price: Rs. {productDetail.price}</p>
                    <p className="card-text">Rating: {renderRating(productDetail.rating)}</p>
                     <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                    ) : (
                        <p>Loading....</p>
                    )}
                    </div>
                    );
}
