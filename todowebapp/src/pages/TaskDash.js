import React from "react";
import { Button } from "react-bootstrap";
import { Card, CardBody } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import {
  PlusIcon,
  CheckIcon,
  ClipboardIcon,
  ActivityIcon,
} from "lucide-react";

export default function TaskDashboard() {
  return (
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
                  <Button variant="link" size="sm" className="text-muted">
                    <PlusIcon className="mr-2 h-4 w-4" /> Add task
                  </Button>
                </div>
                <div className="text-muted mb-4">20 June • Today</div>
                <div className="d-grid gap-4">
                  {[
                    {
                      title: "Attend Nischal's Birthday Party",
                      description:
                        "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)....",
                      image: "/placeholder.svg?height=80&width=80",
                      priority: "Moderate",
                      status: "Not Started",
                    },
                    {
                      title: "Landing Page Design for TravelDays",
                      description:
                        "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
                      image: "/placeholder.svg?height=80&width=80",
                      priority: "Moderate",
                      status: "In Progress",
                    },
                    {
                      title: "Presentation on Final Product",
                      description:
                        "Make sure everything is functioning and all the necessities are properly met. Prepare the team and get the documents ready for...",
                      image: "/placeholder.svg?height=80&width=80",
                      priority: "Moderate",
                      status: "In Progress",
                    },
                  ].map((task, index) => (
                    <Card key={index}>
                      <CardBody className="p-3 d-flex align-items-start gap-3">
                        <div className="flex-grow-1">
                          <h3 className="h6 mb-2">{task.title}</h3>
                          <p className="text-muted small mb-2">
                            {task.description}
                          </p>
                          <div className="d-flex justify-content-between small">
                            <span>Priority: {task.priority}</span>
                            <span>Status: {task.status}</span>
                          </div>
                        </div>
                        <image
                          src={task.image}
                          alt={task.title}
                          width={80}
                          height={80}
                          className="rounded img-fluid"
                        />
                      </CardBody>
                    </Card>
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
                          indicatorColor={status.color}
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
                  {[
                    {
                      title: "Walk the dog",
                      description:
                        "Take the dog to the park and bring treats as well.",
                      image: "/placeholder.svg?height=80&width=80",
                    },
                    {
                      title: "Conduct meeting",
                      description:
                        "Meet with the client and finalize requirements.",
                      image: "/placeholder.svg?height=80&width=80",
                    },
                  ].map((task, index) => (
                    <Card key={index}>
                      <CardBody className="p-3 d-flex align-items-start gap-3">
                        <div className="flex-grow-1">
                          <h3 className="h6 mb-2">{task.title}</h3>
                          <p className="text-muted small mb-2">
                            {task.description}
                          </p>
                          <div className="text-success small">
                            Completed 2 days ago.
                          </div>
                        </div>
                        <image
                          src={task.image}
                          alt={task.title}
                          width={80}
                          height={80}
                          className="rounded img-fluid"
                        />
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
