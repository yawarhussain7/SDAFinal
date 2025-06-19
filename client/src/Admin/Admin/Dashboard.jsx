import React, { useState } from "react";
import { Container, Navbar, Nav, Card, Row, Col, Badge } from "react-bootstrap";
import Admin from "./Admin.jsx";
import Places from "./Places.jsx";
import ManageTour from "./ManageTour.jsx";
import ManageHotel from "./ManageTour.jsx";
import Feedback from "./Feedback.jsx";
import Newsletter from "./Newsletter.jsx";
import Blogs from "./Blogs.jsx";
import {
  FaTachometerAlt,
  FaUser,
  FaClock,
  FaCloud,
  FaComments,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGooglePlus,
  FaBell,
  FaEnvelope,
  FaQuestion,
  FaTable,
  FaAppStore,
  FaFileAlt,
  FaMapMarkerAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Dataset 1",
        data: [40, 60, 80, 70, 50, 90],
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        tension: 0.4,
      },
      {
        label: "Dataset 2",
        data: [20, 40, 60, 50, 70, 30],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
      {
        label: "Dataset 3",
        data: [10, 30, 50, 40, 60, 20],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        tension: 0.4,
      },
    ],
  };

  const sidebarItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", section: "dashboard" },
    { icon: <FaUser />, label: "Admin", section: "admin" },
    { icon: <FaMapMarkerAlt />, label: "Places", section: "places" },
    { icon: <FaTable />, label: "Manage Tour", section: "manageTour" },
    { icon: <FaAppStore />, label: "Manage Hotel", section: "manageHotel" },
    { icon: <FaComments />, label: "Feedback", section: "feedback" },

    { icon: <FaEnvelope />, label: "Newsletter", section: "newsletter" },
    { icon: <FaFileAlt />, label: "Blogs", section: "blogs" },
    { icon: <FaCog />, label: "Settings", section: "settings" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <h2>Dashboard</h2>
            <Row className="mb-4">
              <Col md={3}>
                <Card className="text-center p-3">
                  <FaUser size={40} color="#f4a261" />
                  <h4>2500</h4>
                  <p>Welcome</p>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center p-3">
                  <FaClock size={40} color="#2a9d8f" />
                  <h4>123.50</h4>
                  <p>Average Time</p>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center p-3">
                  <FaCloud size={40} color="#264653" />
                  <h4>1,805</h4>
                  <p>Collections</p>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center p-3">
                  <FaComments size={40} color="#e76f51" />
                  <h4>54</h4>
                  <p>Comments</p>
                </Card>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={2}>
                <Card className="text-center p-3 bg-primary text-white">
                  <FaFacebook size={30} />
                  <h4>35k</h4>
                  <p>Friends</p>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center p-3 bg-info text-white">
                  <FaTwitter size={30} />
                  <h4>128</h4>
                  <p>Feeds</p>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center p-3 bg-secondary text-white">
                  <FaLinkedin size={30} />
                  <h4>584k</h4>
                  <p>Followers</p>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center p-3 bg-dark text-white">
                  <FaTwitter size={30} />
                  <h4>978</h4>
                  <p>Tweets</p>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center p-3 bg-warning text-white">
                  <FaFacebook size={30} />
                  <h4>758+</h4>
                  <p>Contacts</p>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center p-3 bg-danger text-white">
                  <FaGooglePlus size={30} />
                  <h4>450</h4>
                  <p>Followers</p>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Card className="p-3">
                  <h4>Extra Area Chart</h4>
                  <Line data={chartData} />
                </Card>
              </Col>
            </Row>
          </>
        );
      case "admin":
        return <Admin />;
      case "places":
        return <Places />;
      case "manageTour":
        return <ManageTour />;
      case "manageHotel":
        return <ManageHotel />;
      case "feedback":
        return <Feedback />;
      case "companyVerification":
        return <CompanyVerification />;
      case "newsletter":
        return <Newsletter />;
      case "blogs":
        return <Blogs />;
      default:
        return (
          <div className="text-center py-5">
            <h3>Welcome to the Dashboard</h3>
            <p>Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="rounded-circle me-2"
          />
          <div>
            <h6>John David</h6>
            <small className="text-success">Online</small>
          </div>
        </div>
        <Nav className="flex-column">
          {sidebarItems.map((item, index) => (
            <Nav.Link
              key={index}
              className={`sidebar-item ${
                activeSection === item.section ? "active" : ""
              }`}
              onClick={() => item.section && setActiveSection(item.section)}>
              {item.icon} {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="justify-content-between">
          <Navbar.Brand href="#">Pluto</Navbar.Brand>
          <Nav className="align-items-center">
            <Nav.Link href="#" className="text-white">
              <FaBell /> <Badge bg="danger">2</Badge>
            </Nav.Link>
            <Nav.Link href="#" className="text-white">
              <FaQuestion />
            </Nav.Link>
            <Nav.Link href="#" className="text-white">
              <FaEnvelope /> <Badge bg="danger">3</Badge>
            </Nav.Link>
            <Navbar.Text className="ms-2 text-white">
              <img
                src="https://via.placeholder.com/30"
                alt="User"
                className="rounded-circle me-2"
              />
              John David <span className="text-warning">▼</span>
            </Navbar.Text>
          </Nav>
        </Navbar>

        {/* Dashboard Body */}
        <Container fluid className="p-4">
          {renderSection()}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
