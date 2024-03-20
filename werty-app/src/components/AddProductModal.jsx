import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import "./AddProductModal.css";

export default function AddProductModal({
  show,
  onClose,
  onSubmit,
  fetchData,
  editProductData,
  onEdit
}) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    category: "",
    images: [],
  });

  const validateForm = useCallback(() => {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      category,
      images,
    } = formData;
    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      price.trim() !== "" &&
      discountPercentage.trim() !== "" &&
      rating.trim() !== "" &&
      stock.trim() !== "" &&
      category.trim() !== "" &&
      images.length > 0
    );
  }, [formData]);

  useEffect(() => {
    if (editProductData) {
      setFormData(editProductData);
    } else {
      setFormData({
        id: "",
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        category: "",
        images: [],
      });
    }
  }, [editProductData]);



  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, validateForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData[name], value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    fetchData();
  };

  const handleSave = async (e, productId) => {
    e.preventDefault();
    onEdit(productId, formData);
    fetchData();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editProductData ? "Edit Product" : "Add Product"}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form >
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Discount Percentage</label>
                <input
                  type="number"
                  className="form-control"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input
                  type="number"
                  className="form-control"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                />
              </div>
              {editProductData ? (<button
                disabled={!isFormValid}
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSave(e, editProductData.id)}
                 
              >
                Save Changes
              </button>) : (
                <button
                disabled={!isFormValid}
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>

              )}
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
