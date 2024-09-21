import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState([]);

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
        setTask(response.data.tasks);
      } catch (error) {
        console.error(
          "Error fetching task :",
          error.response ? error.response.data : error.message
        );
      }
    }
    gettask();
  }, [taskId]);
  return (
    <div>
      <div className="row">
        <div className="">
          <div className="card shadow-sm p-3">
            <div className="d-flex align-items-center mb-3">
              <img
                src={task.taskimage}
                alt={task.title}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "10px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
              <h4>{task.title}</h4>
            </div>
            <p>
              <strong>Priority:</strong>{" "}
              <span
                className={`text-${
                  task.priority === "Extreme"
                    ? "danger"
                    : task.priority === "Moderate"
                    ? "primary"
                    : "success"
                }`}
              >
                {task.priority}
              </span>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-danger">{task.status}</span>
            </p>
            <p>{task.description}</p>
            <p>
              <small className="text-muted">
                Created on: {new Date(task.createdAt).toLocaleDateString()}
              </small>
            </p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-danger me-2">
                <i className="bi bi-trash"></i>
              </button>
              <button className="btn btn-outline-primary">
                <i className="bi bi-pencil"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
