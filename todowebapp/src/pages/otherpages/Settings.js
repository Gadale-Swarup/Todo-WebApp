import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImageUrlModal, setShowImageUrlModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [userInfo, setUserInfo] = useState({
    Fname: "",
    Lname: "",
    email: "",
    contactNumber: "",
    profilepic: ""
  });

  const handleBack = () => {
    navigate("taskhome");
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
        setUser(response.data.user);
        setUserInfo({
          Fname: response.data.user.Fname || "",
          Lname: response.data.user.Lname || "",
          email: response.data.user.email || "",
          contactNumber: response.data.user.contactNumber || "",
          profilepic: response.data.user.image || ""
        });
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

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Determine the type of update
    const updateType = showPasswordForm ? "password" : "info";
    const updatePayload = updateType === "password" ? {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    } : userInfo;

    if (updateType === "password" && passwordData.newPassword !== passwordData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5012/api/users/updatebyid/${user._id}`,
        { updateType, ...updatePayload },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem('token') }
        }
      );

      if (updateType === "info") {
        setUser(response.data.user);
        console.log("User Info Updated:", response.data.user);
      } else {
        console.log("Password Change Data", response.data);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordForm(false);
      }
    } catch (error) {
      console.error(
        `Error ${updateType === "info" ? "updating user info" : "changing password"}:`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageClick = () => {
    setShowImageUrlModal(true);
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
      setUser({ ...user, image: response.data.image.image });
      setUserInfo({ ...userInfo, profilepic: response.data.image.image });
      setShowImageUrlModal(false);
      setImageUrl("");
    } catch (error) {
      console.error("Error updating image URL:", error);
    }
  };

  return (
    <div className="container">
      <div className="account-info-container" style={{ width: "1000px" }}>
        <span className="go-back text-content-end" onClick={handleBack}>Go Back</span>
        <h2>{showPasswordForm ? "Change Password" : "Account Information"}</h2>
        <div className="row mb-5">
          <div className="col-md-2">
            <img
              src={user.image ? `http://localhost:5001/${user.image}` : "https://via.placeholder.com/100"}
              alt="Profile"
              className="profile-img"
              onClick={handleImageClick}
            />
          </div>
          <div className="col-md-10">
            <h4>{user.Fname} {user.Lname}</h4>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="info-form">
          <form onSubmit={handleSubmit}>
            {!showPasswordForm ? (
              <>
                <label>First Name</label>
                <input
                  type="text"
                  name="Fname"
                  value={userInfo.Fname}
                  onChange={handleUserInfoChange}
                />

                <label>Last Name</label>
                <input
                  type="text"
                  name="Lname"
                  value={userInfo.Lname}
                  onChange={handleUserInfoChange}
                />

                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                />

                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={userInfo.contactNumber}
                  onChange={handleUserInfoChange}
                />

                <label>Profile Picture</label>
                <input
                  type="text"
                  name="profilepic"
                  value={userInfo.profilepic}
                  onChange={handleUserInfoChange}
                />

                <div className="form-buttons">
                  <button type="submit" className="update-btn">Update Info</button>
                  <button
                    type="button"
                    className="password-btn"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Change Password
                  </button>
                </div>
              </>
            ) : (
              <>
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
                  <button type="submit" className="update-btn">Update Password</button>
                </div>
              </>
            )}
          </form>
        </div>

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
