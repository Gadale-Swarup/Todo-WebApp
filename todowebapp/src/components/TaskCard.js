import React from "react";
import { Image } from "react-bootstrap";
import "./TaskCard.css";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  createdOn,
  taskimage,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div
      className="card shadow-sm p-3 mb-3 bg-white rounded"
      style={{ borderRadius: "10px", maxWidth: "600px", position: "relative" }}
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
            <h5 className="card-title mb-1 fw-bold">{title}</h5>
            <p className="card-text text-muted" style={{ maxWidth: "380px" }}>
              {description}
            </p>
          </div>
        </div>
        {/* Task Image */}
        <Image
          src={taskimage || "https://via.placeholder.com/60"}
          rounded
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
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="mb-0">
          <strong>Priority:</strong>{" "}
          <span className="text-primary">{priority}</span>
        </p>
        <p className="mb-0">
          <strong>Status:</strong> <span className="text-danger">{status}</span>
        </p>
        <p className="mb-0">
          <small className="text-muted">
            Created on: {formatDate(createdOn)}
          </small>
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
  );
};

export default TaskCard;
