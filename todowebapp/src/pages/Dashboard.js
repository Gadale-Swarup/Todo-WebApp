import React from "react";
import { Nav } from "react-bootstrap";
import "./Dashboard.css"; // Custom CSS for additional styling

const Dashboard = () => {
  return (
    <div>
      <div
        className="d-flex flex-column bg-danger text-white p-3 sidebar"
        // style={{ width: "365",height:'911px',marginTop:'133px',border:'0px, 8px, 8px, 0px' }}
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
            <Nav.Link href="#" className="text-white mb-3">
              <i className="bi bi-grid-fill me-2"></i> Dashboard
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-3">
              <i className="bi bi-exclamation-circle-fill me-2"></i> Vital Task
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-3">
              <i className="bi bi-list-task me-2"></i> My Task
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-3">
              <i className="bi bi-folder-fill me-2"></i> Task Categories
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-3">
              <i className="bi bi-gear-fill me-2"></i> Settings
            </Nav.Link>
            <Nav.Link href="#" className="text-white mb-3">
              <i className="bi bi-question-circle-fill me-2"></i> Help
            </Nav.Link>
          </div>

          <Nav.Link href="#" className="text-white mb-3 mt-auto">
            <i className="bi bi-box-arrow-left me-2"></i> Logout
          </Nav.Link>
        </Nav>
      </div>

      <div className="p-4"></div>
    </div>
  );
};

export default Dashboard;
