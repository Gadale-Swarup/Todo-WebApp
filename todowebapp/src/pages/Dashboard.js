import {React,useState} from "react";
import{useEffect} from 'react'
import { Nav } from "react-bootstrap";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import TaskDashboard from "./otherpages/TaskDash";
import axios from "axios";
import VitalTask from "./otherpages/VitalTask";
import TaskCategories from "./otherpages/TaskCategories";
import Settings from "./otherpages/Settings";
import MyTask from "./otherpages/MyTask";
import TaskDetails from "./otherpages/TaskDetails";


const Dashboard = () => {
  const [user, setUser] = useState({});
  const Navigate =useNavigate();
  // const [token, setToken] = useState();

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
  
 

  const logout = () => {
    Navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };



  return (
    <>
    <Navbar/>
    <div className="d-flex">
      <div>
        <div
          className="d-flex flex-column bg-danger text-white p-3 sidebar"
          id="sidebar"
        >
          <div className="profile-pic-container">
            <img
              src={user.profilepic}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <div className="text-center mt-5">
            {" "}
            <h5>{ user.username}</h5>
            <p style={{ fontSize: "0.9rem" }}>{user.email}</p>
          </div>

          <Nav className="d-flex flex-column vh-100">
            <div>
              <Link to="/dashboard/taskhome">
                <button id="b1" className="btn text-white w-100 mb-3">
                  <span className="lift-text-on-hover">
                    <i className="bi bi-grid-fill me-2"></i> Dashboard
                  </span>
                </button>
              </Link>
              <Link to="vitaltask">
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-exclamation-circle-fill me-2"></i> Vital
                  Task
                </span>
              </button>
              </Link>
              <Link to='mytask'>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-list-task me-2"></i> My Task
                </span>
              </button>
              </Link>
              <Link to="taskcategories">
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-folder-fill me-2"></i> Task Categories
                </span>
              </button>
               </Link>
               <Link to="settings">
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-gear-fill me-2"></i> Settings
                </span>
              </button>
               </Link>
              <button id="b1" className="btn text-white w-100 mb-3">
                <span className="lift-text-on-hover">
                  <i className="bi bi-question-circle-fill me-2"></i> Help
                </span>
              </button>
            </div>

            <button id="b1" className="btn text-white w-100 mb-3 mt-auto" onClick={()=>(logout())}>
              <span className="lift-text-on-hover">
                <i className="bi bi-box-arrow-left me-2"></i> Logout
              </span>
            </button>
          </Nav>
        </div>
      </div>
      <div
        className="hero-section"
        style={{ marginTop:'25px', padding: "25px", width: "100%" }}
      >
        <Routes>
          <Route path="taskhome" element={<TaskDashboard user={user} />}/>
          <Route path="vitaltask" element={<VitalTask/>} />
          <Route path="taskcategories" element={<TaskCategories/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="mytask" element={<MyTask/>} />
          {/*<Route path="help" element={<h1>Help</h1>} />*/}
          <Route path="details/:taskid" element={<TaskDetails/>} /> 
        </Routes>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
