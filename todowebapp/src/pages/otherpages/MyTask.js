import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/TaskCard';
import axios from 'axios';

const MyTask = () => {
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    async function getTasks() {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found. Authorization denied.");
        return;  
      }

      try {
        const response = await axios.get(
          'http://localhost:5012/api/task/getTasksForUser',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Tasks Response:', response.data);
        if (response.data && Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);  
        } else {
          console.error("No tasks found or response format is incorrect");
        }
      } catch (error) {
        console.error(
          'Error fetching tasks:',
          error.response ? error.response.data : error.message
        );
      }
    }

    getTasks();
  }, []);  

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="row">
      {/* Left Side - List of Tasks */}
      <div className="col-md-6">
        <div className="card shadow-sm p-3 mb-3 bg-white rounded">
          <h2>My Tasks</h2>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} onClick={() => handleTaskClick(task)}>
                <TaskCard
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  status={task.status}
                  createdOn={task.createdAt}
                  imageSrc={task.taskimage}
                />
              </div>
            ))
          ) : (
            <p>No tasks found</p> 
          )}
        </div>
      </div>

      {/* Right Side - Task Details */}
      <div className="col-md-6">
        <div className="">
          {selectedTask ? (
            <div className="card shadow-sm p-3">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={selectedTask.taskimage}
                  alt={selectedTask.title}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    marginRight: "15px",
                    objectFit: "cover",
                  }}
                />
                <h4>{selectedTask.title}</h4>
              </div>
              <p>
                <strong>Priority:</strong>{" "}
                <span
                  className={`text-${
                    selectedTask.priority === "Extreme"
                      ? "danger"
                      : selectedTask.priority === "Moderate"
                      ? "primary"
                      : "success"
                  }`}
                >
                  {selectedTask.priority}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-danger">{selectedTask.status}</span>
              </p>
              <p>{selectedTask.description}</p>
              <p>
                <small className="text-muted">
                  Created on:{" "}
                  {new Date(selectedTask.createdAt).toLocaleDateString()}
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
          ) : (
            <div className="card p-3 shadow-sm">
              <p>Select a task to see the details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTask;
