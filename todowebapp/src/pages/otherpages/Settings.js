import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false); // State to toggle forms
  const [showImageUrlModal, setShowImageUrlModal] = useState(false); // State to toggle image URL modal
  const [imageUrl, setImageUrl] = useState(""); // State for storing image URL input
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleBack = () => {
    navigate("/settings");
  };

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5012/api/users/getuserinfo",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User Info:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response ? error.response.data : error.message
        );
      }
    }

    getUserInfo();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("Password Change Data", passwordData);
    // Implement password change API call
  };

  const handleImageClick = () => {
    setShowImageUrlModal(true); // Open modal to input image URL
  };

  const handleImageUrlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5012/api/user/addimage",
        { image: imageUrl },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser({ ...user, image: response.data.image.image }); // Update user image on success
      setShowImageUrlModal(false); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="account-info-container"
      style={{width:'1000px'}}>
        <Link to="/settings">
          <span className="go-back text-content-end">Go Back</span>
        </Link>

        <h2>{showPasswordForm ? "Change Password" : "Account Information"}</h2>

        {!showPasswordForm ? (
          <>
            <div className="row mb-5">
              <div className="col-md-2">
                <img
                  src={
                    user.image
                      ? `http://localhost:5001/${user.image}`
                      : "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="profile-img"
                  onClick={handleImageClick}
                />
              </div>
              <div className="col-md-10">
                <h4>
                  {user.Fname} {user.Lname}
                </h4>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="info-form">
              <form>
                <label>First Name</label>
                <input type="text" placeholder={user.Fname} />

                <label>Last Name</label>
                <input type="text" placeholder={user.Lname} />

                <label>Email Address</label>
                <input type="email" placeholder={user.email} />

                <label>Contact Number</label>
                <input type="text" placeholder="Contact Number" />

                <label>Profile Picture</label>
                <input type="text" placeholder={user.profilepic} />

                <div className="form-buttons">
                  <button type="submit" className="update-btn">
                    Update Info
                  </button>
                  <button
                    type="button"
                    className="password-btn"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="info-form">
            <form onSubmit={handlePasswordSubmit}>
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
              />

              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
              />

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
              />

              <div className="form-buttons">
                <button type="submit" className="update-btn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal for Image URL */}
        <Modal
          show={showImageUrlModal}
          onHide={() => setShowImageUrlModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Image URL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleImageUrlSubmit}>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="form-control"
              />
              <div className="form-buttons">
                <Button
                  variant="secondary"
                  onClick={() => setShowImageUrlModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
