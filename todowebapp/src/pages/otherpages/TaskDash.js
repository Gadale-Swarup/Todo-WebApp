import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Card, CardBody } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { PlusIcon, CheckIcon, ClipboardIcon, ActivityIcon } from "lucide-react";
import axios from "axios";
import TaskCard from "../../components/TaskCard";
import AddTaskModal from "./AddTaskModal";
// import TaskCard from "../components";

export default function TaskDashboard({ user }) {
  const [task, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [expandedTask, setExpandedTask] = useState(null);

  const handleReadMore = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getMonths = () => {
    const today = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[today.getMonth()];
  };
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}`;
  };

  useEffect(() => {
    async function gettask() {
      try {
        const response = await axios.post(
          "http://localhost:5012/api/task/getalltask",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Task:", response.data);
        setTask(response.data);
      } catch (error) {
        console.error(
          "Error fetching task :",
          error.response ? error.response.data : error.message
        );
      }
    }
    gettask();
  }, []);

  return (
    <div>
      <div>
        <div className="container sm-0 min-vh-100">
          {/* Header Section */}
          <div className="p-4">
            {/* Welcome back greeting */}
            <div className="d-flex justify-content-between mb-4">
              <div className="welcome-back">
                <h1 style={{ color: "black" }}>
                  Welcome back, Sundar{" "}
                  <span role="img" aria-label="wave">
                    👋
                  </span>
                </h1>
              </div>

              <div className="d-flex align-items-center">
                {/* Invite button */}
                <Button variant="outline-danger" className="ms-3 invite-btn">
                  <i className="bi bi-person-plus"></i> Invite
                </Button>
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="row g-4 shadow-lg">
            {/* Left Column */}
            <div className="col-md-6">
              <Card>
                <CardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h5 d-flex align-items-center gap-2">
                      <ClipboardIcon className="h-5 w-5" />
                      To-Do
                    </h2>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-muted"
                      onClick={handleShow}
                    >
                      <PlusIcon className="mr-2 h-4 w-4" /> Add task
                    </Button>
                    <AddTaskModal show={showModal} handleClose={handleClose} />
                  </div>
                  <div className="text-muted mb-4">
                    {getCurrentDate()} {getMonths()} • Today
                  </div>
                  <div className="d-grid gap-4">
                    {task.map((task) => (
                      <TaskCard
                        key={task._id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        status={task.status}
                        createdOn={task.createdAt}
                        imageSrc={task.taskimage}
                      />
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-md-6 d-flex flex-column gap-4">
              {/* Task Status */}
              <Card>
                <CardBody className="p-4">
                  <h2 className="h5 mb-4 d-flex align-items-center gap-2">
                    <ActivityIcon className="h-5 w-5" />
                    Task Status
                  </h2>
                  <div className="row text-center">
                    {[
                      { label: "Completed", value: 84, color: "bg-success" },
                      { label: "In Progress", value: 46, color: "bg-primary" },
                      { label: "Not Started", value: 13, color: "bg-danger" },
                    ].map((status, index) => (
                      <div key={index} className="col-4">
                        <div
                          className="position-relative mx-auto"
                          style={{ width: "100px", height: "100px" }}
                        >
                          <ProgressBar
                            value={status.value}
                            className="ProgressBar-circle"
                            indicatorcolor={status.color}
                          />
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <span className="h4 fw-bold">{status.value}%</span>
                          </div>
                        </div>
                        <div className="small">{status.label}</div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Completed Tasks */}
              <Card>
                <CardBody className="p-4">
                  <h2 className="h5 mb-4 d-flex align-items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-success" />
                    Completed Task
                  </h2>
                  <div className="d-grid gap-4">
                    {task
                      .filter((task) => task.status === "Completed")
                      .map((task) => (
                        <div
                          className="card shadow-sm p-3 mb-3 bg-white rounded"
                          style={{
                            borderRadius: "10px",
                            maxWidth: "600px",
                            position: "relative",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            {/* Task Icon and Title */}
                            <div className="d-flex">
                              {/* Red Circle Icon */}
                              <div
                                className="icon-circle text-danger me-2"
                                style={{ fontSize: "24px" }}
                              >
                                ⭕
                              </div>
                              <div>
                                <h5 className="card-title mb-1 fw-bold">
                                  {task.title}
                                </h5>
                                <p
                                  className="card-text text-muted"
                                  style={{ maxWidth: "380px" }}
                                >
                                 {expandedTask === task._id
                                  ? task.description
                                  : `${task.description.substring(0, 100)}...`}
                                {task.description.length > 100 && (
                                  <Button
                                    variant="link"
                                    onClick={() => handleReadMore(task._id)}
                                  >
                                    {expandedTask === task._id
                                      ? "Read Less"
                                      : "Read More"}
                                  </Button>
                                )}
                                </p>
                              </div>
                            </div>
                            {/* Task Image */}
                            <img
                              src={
                                task.taskimage ||
                                "https://via.placeholder.com/60"
                              }
                              rounded
                              alt={task.title}
                              style={{
                                width: "90px",
                                height: "90px",
                                marginTop: "25px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </div>

                          {/* Bottom Section: Priority, Status, and Created On */}
                          <div className="d-flex justify-content-between align-items-center mt-1"
                          style={{marginLeft:'35px'}}>
                            <p className="mb-0">
                              <strong>Status:</strong>{" "}
                              <span className="text-success ">
                                {task.status}
                              </span>
                            </p>
                          </div>

                          {/* Three dots */}
                          <div>
                            <div
                              style={{
                                position: "absolute",
                                top: "14px",
                                right: "10px",
                                cursor: "pointer",
                              }}
                            >
                              °°°
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
