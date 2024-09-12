import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'; // Optional, for custom styles

const CalendarModal = () => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button to trigger the modal */}
      <Button variant="light" onClick={handleShow} className="calendar-btn">
        <FaCalendarAlt size={20} />
      </Button>

      {/* Calendar Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            dateFormat="dd/MM/yyyy"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CalendarModal;
