import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

// import CreateCategoryForm from "./CreatecategoryForm";

import "./TaskCategories.css";

const TaskCategories = () => {
  const navigate = useNavigate();
  const [taskStatus, setTaskStatus] = useState([
    { id: 1, name: "Completed" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Not Started" },
  ]);

  const [taskPriority, setTaskPriority] = useState([
    { id: 1, name: "Extreme" },
    { id: 2, name: "Moderate" },
    { id: 3, name: "Low" },
  ]);

  const handleEdit = (type, id) => {
    console.log(`Edit ${type} with id: ${id}`);
  };

  const handleDelete = (type, id) => {
    console.log(`Delete ${type} with id: ${id}`);
  };
  const handlecategory = () => {
    navigate("createcategory");
  };

  return (
    <div
      className="task-categories-container shadow-lg border-dark-subtle"
      style={{ border: "0.5px light gray", marginTop: "15px" }}
    >
      <div
        className="button"
        style={{ marginLeft: "90%", color: "black", listStyle: "none" }}
      >
        <Link to={"/dashboard"}>
          <span type="button">Go Back</span>
        </Link>
      </div>
      <h2>Task Categories</h2>

      <Button variant="danger" className="mb-3" onClick={handlecategory}>
        Add Category
      </Button>

      <div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="m-0 mt-2">Task Status</h4>
          </div>
          <div className="col-md-6">
            <Button variant="button" style={{ marginLeft: "70%" }}>
              <span style={{ color: "orange" }}>+</span> Add Task Status
            </Button>
          </div>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskStatus.map((status, index) => (
              <tr key={status.id}>
                <td>{index + 1}</td>
                <td>{status.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit("status", status.id)}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete("status", status.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="mt-5">
        <div className="row ">
          <div className="col-md-6">
            <h4>Task Priority</h4>
          </div>
          <div className="col-md-6">
            <Button
              variant="button"
              className="mb-2"
              style={{ marginLeft: "70%" }}
            >
              <span style={{ color: "orange" }}>+</span> Add New Priority
            </Button>
          </div>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskPriority.map((priority, index) => (
              <tr key={priority.id}>
                <td>{index + 1}</td>
                <td>{priority.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit("priority", priority.id)}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete("priority", priority.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TaskCategories;
