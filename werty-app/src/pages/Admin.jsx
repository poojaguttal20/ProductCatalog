import { useContext } from "react";
// import { useCallback, useEffect } from "react";
import { useState } from "react";
import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import Products from "../components/Products";
import { DataContext } from '../store/DataStore';

export default function Admin({ user }) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);
  const [editProductData, setEditProductData] = useState(null);

  const {products, fetchData} = useContext(DataContext);
  

  const handleButtonClick = async (action, productId) => {
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
        if (action === "delete") {
          if (response.ok) {
            const productdata = await response.json();
            setDeleteProductData(productdata);
            setShowDeleteProductModal(true);
            
          } else{
            console.log("Error fetching product");
          }
        }else if(action === "edit"){
          if(response.ok) {
          const productdata = await response.json();
          setEditProductData(productdata);
          setShowAddProductModal(true);
          console.log("Fetched product details:", productdata);
        } else {
          console.log("Error fetching product details");
        }
      }
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    
  };

  

  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch("http://localhost:3001/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Updated products");
        setShowAddProductModal(false);
        fetchData();
        // alert("New product added");
      } else {
        console.log("Failed to add a new Product");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onEdit = async (productId, productData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/editproduct/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      if (response.ok) {
        console.log("product updated successfully");
        setShowAddProductModal(false);
        fetchData();
        // alert("update the product", productData.name);
      } else {
        console.log("Error updating the product");
      }
    } catch (error) {
      console.log("Error updating the product", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/deleteproduct/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("product updated successfully");
        setShowDeleteProductModal(false);
        fetchData();
        // alert("update the product", productData.name);
      } else {
        console.log("Error deleting the product");
      }
    } catch (error) {
      console.log("Error updating the product", error);
    }
  };
  return (
    <div
      className="container mt-4"
      style={{
        zIndex: 1,
        position: "relative",
        paddingBottom: "80px",
        paddingTop: "80px",
      }}
    >
      <div className="d-flex mt-3 justify-content-between align-items-center">
        <h4>Admin Dashboard</h4>
        <div>
          <button
            className="btn btn-block button-style"
            onClick={() => setShowAddProductModal(true)}
          >
            Add Product
          </button>
        </div>
      </div>

      <Products
        user={user}
        products={products}
        handleButtonClick={handleButtonClick}
        fetchData={fetchData}
      />
      <AddProductModal
        show={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onEdit={onEdit}
        onSubmit={onSubmit}
        editProductData={editProductData}
        fetchData={fetchData}
      />
      <DeleteProductModal show={showDeleteProductModal} deleteProductData={deleteProductData} onClose={()=>setShowDeleteProductModal(false)} handleDelete={handleDelete}/>
    </div>
  );
}
