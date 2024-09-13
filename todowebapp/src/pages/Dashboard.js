import React from "react";
import { Nav } from "react-bootstrap";
import { Link, Routes, Route } from "react-router-dom";
import "./Dashboard.css";
// import TaskDash from "./TaskDash";
import TaskDashboard from "./TaskDash";
// import Sidedbar from "./Sidedbar";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <div>
        <div
          className="d-flex flex-column bg-danger text-white p-3 sidebar"
          id="sidebar"
        >
          <div className="profile-pic-container">
            <img
              src="https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4"
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="text-center mt-5">
            {" "}
            <h5>Sundar Gurung</h5>
            <p style={{ fontSize: "0.9rem" }}>sundargurung360@gmail.com</p>
          </div>

          <Nav className="d-flex flex-column vh-100">
            <div>
              <Link to="taskhome">
                <button id="b1" className="btn text-white w-100 mb-3">
                  <span className="lift-text-on-hover">
                    <i className="bi bi-grid-fill me-2"></i> Dashboard
                  </span>
                </button>
              </Link>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-exclamation-circle-fill me-2"></i> Vital
                  Task
                </span>
              </button>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-list-task me-2"></i> My Task
                </span>
              </button>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-folder-fill me-2"></i> Task Categories
                </span>
              </button>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-gear-fill me-2"></i> Settings
                </span>
              </button>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-question-circle-fill me-2"></i> Help
                </span>
              </button>
            </div>

            <button id="b1" className="btn text-white w-100 mb-3 mt-auto">
              <span className="lift-text-on-hover">
                <i className="bi bi-box-arrow-left me-2"></i> Logout
              </span>
            </button>
          </Nav>
        </div>
      </div>
      <div
        className="content "
        style={{ marginTop:'35px', padding: "25px", width: "100%" }}
      >
        <Routes>
          <Route path="taskhome" element={<TaskDashboard />} />
          {/* <Route path="vitaltask" element={<h1>Vital Task</h1>} />
          <Route path="my-task" element={<h1>My Task</h1>} />
          <Route path="task-categories" element={<h1>Task Categories</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="help" element={<h1>Help</h1>} />
          <Route path="logout" element={<h1>Logout</h1>} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
