import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  Image,
} from "react-bootstrap-icons";
import loginimg from "../img/R2.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilepic: "",
    agreeTerms: "",
  });

  async function register(formData) {
    try {
      const response = await axios.post(
        "http://localhost:5012/api/users/register",
        formData
      );
      console.log("response.data", response.data);
      toast.success(response.data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
    } else {
      setError(""); 
      try {
        await register(formData); 
      } catch (error) {
        console.log("Registration failed");
      }
    }
  };

  return (
    <div className="hero" >
      <div className="container min-vh-100 d-flex align-items-center justify-content-center" >
        <div className="card shadow-lg" style={{ maxWidth: "900px" }}>
          <div className="card-body p-0" >
            <div className="row g-0">
              {/* Left Image Section */}
              <div className="col-lg-5 d-none d-lg-block">
                <img
                  src={loginimg}
                  alt="Person interacting with screens"
                  className="img"
                  style={{
                    width:'300px',
                    marginRight:"250px",
                    borderTopLeftRadius: ".25rem",
                    borderBottomLeftRadius: ".25rem",
                    marginTop: "100px",
                  }}
                />
              </div>

              {/* Right Form Section */}
              <div className="col-lg-7 p-5">
                <h2 className="mb-2">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  {/* First Name Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        name="Fname"
                        value={formData.Fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        name="Lname"
                        value={formData.Lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Username Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <EnvelopeFill />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmpassword"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Image />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add profile pic"
                        name="profilepic"
                        value={formData.profilepic}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div> */}

                  {/* Agree Terms Checkbox */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to all terms
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="register"
                    className="btn btn-danger text-white mb-3">
                    Register
                  </button>

                  {/* Redirect to Sign In */}
                  <p className=" mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-info">
                      Sign In
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        <ToastContainer />
    </div>
  );
};

export default Register;
