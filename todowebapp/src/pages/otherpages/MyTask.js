import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/TaskCard';
import axios from 'axios';

const MyTask = () => {
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await axios.post(
          'http://localhost:5012/api/task/getTasksForUser',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('Tasks:', response.data);
        setTasks(response.data);
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
      <div className="col-md-6">
        <div className="card shadow-sm p-3 mb-3 bg-white rounded" >
          <h2>Vital Tasks</h2>
          {tasks.map((task) => (
            <div onClick={() => handleTaskClick(task)}>

            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              createdOn={task.createdAt}
              imageSrc={task.taskimage}
             
            />
              </div>
          ))}
        </div>
      </div>

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
