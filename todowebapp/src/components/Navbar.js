import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal} from "react-bootstrap";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  const getDayOfWeek = () => {
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[today.getDay()];
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="l">
            <strong>
              <span>Dash</span>board
            </strong>
          </a>

          <form className="d-flex w-50">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search your task here..."
              aria-label="Search"
            />
            <button className="btn btn-search" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center">
            <a href="l" className="nav-icons me-3">
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="45" height="45" rx="8" fill="#FF6767" />
                <path
                  d="M25.6372 32.4118C25.6372 32.5678 25.5767 32.7174 25.4689 32.8277C25.3612 32.938 25.215 33 25.0627 33H18.9342C18.7818 33 18.6356 32.938 18.5279 32.8277C18.4201 32.7174 18.3596 32.5678 18.3596 32.4118C18.3596 32.2558 18.4201 32.1061 18.5279 31.9958C18.6356 31.8855 18.7818 31.8235 18.9342 31.8235H25.0627C25.215 31.8235 25.3612 31.8855 25.4689 31.9958C25.5767 32.1061 25.6372 32.2558 25.6372 32.4118ZM30.8187 29.1765C30.7025 29.3859 30.5339 29.5599 30.3302 29.6805C30.1266 29.8011 29.8952 29.864 29.66 29.8627H14.3378C14.1021 29.8622 13.8708 29.7981 13.667 29.6769C13.4633 29.5557 13.2944 29.3816 13.1772 29.1723C13.0601 28.9629 12.999 28.7256 13 28.4844C13.001 28.2431 13.0641 28.0064 13.1829 27.798C13.724 26.8431 14.5293 24.151 14.5293 20.6471C14.5293 18.6189 15.3162 16.6739 16.7169 15.2398C18.1177 13.8057 20.0175 13 21.9984 13C23.9793 13 25.8791 13.8057 27.2799 15.2398C28.6806 16.6739 29.4675 18.6189 29.4675 20.6471C29.4675 24.15 30.2738 26.8431 30.8158 27.798C30.9359 28.0068 30.9995 28.2446 31 28.4869C31.0005 28.7291 30.9379 28.9672 30.8187 29.1765ZM29.8218 28.3922C29.0969 27.1176 28.3184 24.1451 28.3184 20.6471C28.3184 18.931 27.6526 17.2851 26.4673 16.0717C25.2821 14.8582 23.6746 14.1765 21.9984 14.1765C20.3222 14.1765 18.7147 14.8582 17.5295 16.0717C16.3442 17.2851 15.6784 18.931 15.6784 20.6471C15.6784 24.1461 14.8989 27.1176 14.174 28.3922C14.1572 28.422 14.1484 28.4558 14.1484 28.4902C14.1484 28.5246 14.1572 28.5584 14.174 28.5882C14.1898 28.6183 14.2133 28.6433 14.242 28.6606C14.2707 28.6779 14.3035 28.6868 14.3368 28.6863H29.659C29.6923 28.6868 29.7251 28.6779 29.7538 28.6606C29.7825 28.6433 29.806 28.6183 29.8218 28.5882C29.8386 28.5584 29.8475 28.5246 29.8475 28.4902C29.8475 28.4558 29.8386 28.422 29.8218 28.3922Z"
                  fill="white"
                />
              </svg>
            </a>

              <span className="btn me-3" onClick={handleShow}>
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="45" height="45" rx="8" fill="#FF6767" />
                <path
                  d="M30.875 14.6839L26.3711 14.684V13.5626C26.3711 13.2518 26.1193 13 25.8086 13C25.4978 13 25.2461 13.2518 25.2461 13.5626V14.6837H20.7461V13.5626C20.7461 13.2518 20.4943 13 20.1836 13C19.8728 13 19.6211 13.2518 19.6211 13.5626V14.6837H15.125C14.5037 14.6837 14 15.1875 14 15.8089V29.8747C14 30.4961 14.5037 31 15.125 31H30.875C31.4963 31 32 30.4961 32 29.8747V15.8089C32 15.1878 31.4963 14.6839 30.875 14.6839ZM30.875 29.8747H15.125V15.8089H19.6211V16.3758C19.6211 16.6866 19.8728 16.9384 20.1836 16.9384C20.4943 16.9384 20.7461 16.6866 20.7461 16.3758V15.8092H25.2461V16.3761C25.2461 16.6869 25.4978 16.9387 25.8086 16.9387C26.1193 16.9387 26.3711 16.6869 26.3711 16.3761V15.8092H30.875V29.8747ZM26.9375 21.9982H28.0625C28.373 21.9982 28.625 21.7461 28.625 21.4355V20.3103C28.625 19.9997 28.373 19.7476 28.0625 19.7476H26.9375C26.627 19.7476 26.375 19.9997 26.375 20.3103V21.4355C26.375 21.7461 26.627 21.9982 26.9375 21.9982ZM26.9375 26.4989H28.0625C28.373 26.4989 28.625 26.2471 28.625 25.9363V24.811C28.625 24.5005 28.373 24.2484 28.0625 24.2484H26.9375C26.627 24.2484 26.375 24.5005 26.375 24.811V25.9363C26.375 26.2474 26.627 26.4989 26.9375 26.4989ZM23.5625 24.2484H22.4375C22.127 24.2484 21.875 24.5005 21.875 24.811V25.9363C21.875 26.2471 22.127 26.4989 22.4375 26.4989H23.5625C23.873 26.4989 24.125 26.2471 24.125 25.9363V24.811C24.125 24.5007 23.873 24.2484 23.5625 24.2484ZM23.5625 19.7476H22.4375C22.127 19.7476 21.875 19.9997 21.875 20.3103V21.4355C21.875 21.7461 22.127 21.9982 22.4375 21.9982H23.5625C23.873 21.9982 24.125 21.7461 24.125 21.4355V20.3103C24.125 19.9994 23.873 19.7476 23.5625 19.7476ZM19.0625 19.7476H17.9375C17.627 19.7476 17.375 19.9997 17.375 20.3103V21.4355C17.375 21.7461 17.627 21.9982 17.9375 21.9982H19.0625C19.373 21.9982 19.625 21.7461 19.625 21.4355V20.3103C19.625 19.9994 19.373 19.7476 19.0625 19.7476ZM19.0625 24.2484H17.9375C17.627 24.2484 17.375 24.5005 17.375 24.811V25.9363C17.375 26.2471 17.627 26.4989 17.9375 26.4989H19.0625C19.373 26.4989 19.625 26.2471 19.625 25.9363V24.811C19.625 24.5007 19.373 24.2484 19.0625 24.2484Z"
                  fill="#F5F8FF"
                />
              </svg>
              </span>
          
            
            <div className="date-display">
              <div>{getDayOfWeek()}</div>
              <div>
                <span>{getCurrentDate()}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Calendar Modal */}
      <Modal show={show} onHide={handleClose} centered className="calendar-modal modal-above-icon">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">Calendar</Modal.Title>
        </Modal.Header>
        <input
              type="text"
              className="form m-3"
              // placeholder={getCurrentDate()}
              // onClick={handleShow}
              // readOnly
            />
        <Modal.Body className="modal-body-custom">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            calendarClassName="custom-calendar"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
