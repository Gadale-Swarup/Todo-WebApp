import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AddTaskModal.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddTaskModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    priority: '',
    description: '',
    taskimage: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const formatDateForMongo = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Task Data:', formData);

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        return toast.error('Token not found');
      }

      const formattedDate = formatDateForMongo(formData.dueDate);

      const taskData = {
        ...formData,
        dueDate: formattedDate, 
      };

      const response = await axios.post(
        'http://localhost:5012/api/task/addtask',
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      toast.success('Task added successfully!');
      setFormData(response.data)
      handleClose();
      setFormData({
        title: '',
        dueDate: '',
        priority: '',
        description: '',
        taskimage: '',
      });
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Task Title */}
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Task Date */}
            <Form.Group className="mb-3" controlId="taskDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Task Priority */}
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Check
                  inline
                  label="Extreme"
                  type="radio"
                  name="priority"
                  value="Extreme"
                  checked={formData.priority === 'Extreme'}
                  onChange={handleChange}
                  style={{ color: 'red' }}
                />
                <Form.Check
                  inline
                  label="Moderate"
                  type="radio"
                  name="priority"
                  value="Moderate"
                  checked={formData.priority === 'Moderate'}
                  onChange={handleChange}
                  style={{ color: 'blue' }}
                />
                <Form.Check
                  inline
                  label="Low"
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={formData.priority === 'Low'}
                  onChange={handleChange}
                  style={{ color: 'green' }}
                />
              </div>
            </Form.Group>

            {/* Task Description */}
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Start writing here..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Upload Image as String (URL) */}
            <Form.Group className="mb-3">
              <Form.Label>Task Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="taskimage"
                value={formData.taskimage}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="danger" type="submit" className="w-100">
              Done
            </Button>
          </Form>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </>
  );
};

export default AddTaskModal;
