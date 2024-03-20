import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import "./Signup.css";
import Validation from "../components/Validation";
import Error from "../components/Error";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const clearError = ()=>{
    setErrorMessages({});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name] : ''
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const isFormEmpty = Object.values(formData).every(
      (value) => value.trim() === ""
    );
    if(isFormEmpty) {
      setErrorMessages({ allFields: "Please fill all the details below" });
      return;
    }
    
    let newErrors = {};
   
    const isFormValid = Object.keys(formData).every((name) => {
      const value = formData[name];
      if (value.trim() === "") {
        newErrors = {
          ...newErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        };
        return false;
      }
      return true;
    });

    if (!isFormValid) {
      setErrorMessages(newErrors);
      return;
    }
    
    const validationErrors = {
      name: Validation({ name: "name", value: formData.name }),
      mobile: Validation({ name: "mobile", value: formData.mobile }),
      email: Validation({ name: "email", value: formData.email }),
      password: Validation({ name: "password", value: formData.password }),
    };
    
    setErrorMessages(validationErrors);

   
    if (Object.values(validationErrors).every((error) => error === "")) {

      const updateFormData ={
        ...formData,
        admin: formData.email === "poojaguttal123@gmail.com",
      }

      const existingSignupData = JSON.parse(localStorage.getItem('signupData')) || [];

      const updatedSignupData = [...existingSignupData, updateFormData];

        
      localStorage.setItem("signupData", JSON.stringify(updatedSignupData));
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
      });
      navigate('/login');
    }

    
  };
  return (
    <div
      className="container mt-4 d-flex justify-content-center"
      style={{
        zIndex: 1,
        position: "relative",
        paddingBottom: "80px",
        paddingTop: "80px",
      }}
    >
      <form
        className="form-group p-4 border rounded"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">SignUp</h2>
        {errorMessages.allFields && <Error message={errorMessages.allFields} />}
        {/* {Object.keys(errorMessages).length > 0 && !errorMessages.allFields && (
          <div>
            {Object.keys(errorMessages).map((fieldName, index) => (
              <Error key={index} message={errorMessages[fieldName]} />
            ))}
          </div>
        )} */}
        <Input
          type="text"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          errorMessage={errorMessages.name}
          clearError={clearError}

        />
        <Input
          type="number"
          label="Mobile No"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          errorMessage={errorMessages.mobile}
          clearError={clearError}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          errorMessage={errorMessages.email}
          clearError={clearError}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          errorMessage={errorMessages.password}
          clearError={clearError}
        />
        <button
          type="submit"
          className="btn btn-block mt-3 button-style"
          onClick={handleSubmit}
        >
          Sign up
        </button>
        <p className="mt-3">
          Already User? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
