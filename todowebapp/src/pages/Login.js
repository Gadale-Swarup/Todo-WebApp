import React, { useState } from "react";
import { PersonFill, LockFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Rimg from "../img/ach3.png";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const usernamechange = (e) => {
    setUsername(e.target.value);
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };

  async function login(payload) {
    try {
      const response = await axios.post(
        "http://localhost:5012/api/users/login",
        payload
      );
      const { token,success } = response.data;
      setToken(token);
      // setSuccess(success);
      localStorage.setItem("token", token);
      toast.success("User successfully logged in");
      return success;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid Email or Password");
      } else if (error.response && error.response.status === 404) {
        toast.error("User is not registered");
      } else {
        toast.error("Login failed. Please try again.");
      }
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login({ username, password });
    if (loginSuccess) {
      navigate("/dashboard/taskhome");
    }
  };
  return (
    <div className="hero">
      <div>
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg" style={{ maxWidth: "900px" }}>
            <div className="card-body p-0">
              <div className="row g-0">
                {/* Right Image Section */}
                <div className="col-lg-7 p-5">
                <h2 className="mb-4 mt-5">Sign In</h2>
                  <form onSubmit={handleSubmit}>
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
                          onChange={usernamechange}
                          value={username}
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
                          value={password}
                          onChange={handlepassword}
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    {/* Agree Terms Checkbox */}
                    {/* <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeTerms"
                        name="agreeTerms"
                        // checked={formData.agreeTerms}
                        // onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        Remember Me
                      </label>
                    </div> */}

                    {/* Submit Button */}
                    <button type="submit"
                    id="register"
                    className="btn btn-danger text-center text-white mb-3">
                      Login
                    </button>

                    {/* Redirect to Sign In */}

                    <p className="mb-0 mt-5">
                      Don't have an account?{" "}
                      <a href="/" className="text-info">
                        Create One
                      </a>
                    </p>
                  </form>
                </div>
                {/* Left Form Section */}
                <div className="col-lg-5 d-none d-lg-block ">
                <img
                    src={Rimg}
                    alt="Person interacting with screens"
                    className="img-fluid h-80"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem",
                      marginTop: "100px",
                    }}
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
