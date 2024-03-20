import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Input from "../components/Input";
import Validation from "../components/Validation";

export default function Login({onLogin}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const clearError = () => {
    setErrorMessages({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormEmpty = Object.values(formData).every(
      (value) => value.trim() === ""
    );
    if (isFormEmpty) {
      setErrorMessages({ allfields: "Please fill the details below" });
      return;
    }

    let newError = {};

    const isFormValid = Object.keys(formData).every((name) => {
      const value = formData[name];
      if (value.trim() === "") {
        newError = {
          ...newError,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        };
        return false;
      }
      return true;
    });

    if (!isFormValid) {
      setErrorMessages(newError);
      return;
    }

    const ValidationErrors = {
      email: Validation({ name: "email", value: formData.email }),
      password: Validation({ name: "password", value: formData.password }),
    };

    setErrorMessages(ValidationErrors);

    const storedData = JSON.parse(localStorage.getItem("signupData")) || [];
    const { email, password } = formData;
    // console.log(storedData.email, email);
    // console.log(storedData.password, password);
    const user = storedData.find((user) => user.email === email && user.password === password);
    if (user) {
        if (user.admin){
            navigate("/admin");
        }else{
            navigate("/user");
        }
       onLogin(user);
    } else {
      setErrorMessages({ login: "Invalid email or password" });
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
        <h2 className="text-center mb-4">Login</h2>
        {errorMessages.allFields && <Error message={errorMessages.allFields} />}
        {errorMessages.login && <Error message={errorMessages.login} />}
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          errorMessage={errorMessages.email}
          clearError={clearError}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          errorMessage={errorMessages.password}
          clearError={clearError}
        />
        <button
          className="btn btn-block button-style"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="mt-3">
          New User? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
}
