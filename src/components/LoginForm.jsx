import React, { useState } from 'react';
import { Container, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setShowOverlay(true);

    fetch('https://sheetdb.io/api/v1/131pnl5khpeib')
      .then((response) => response.json())
      .then((data) => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        const filteredLearners = data.filter(
          (learner) =>
            learner.RollNo &&
            learner.Password &&
            learner.RollNo === trimmedUsername &&
            learner.Password === trimmedPassword
        );

        if (filteredLearners.length > 0) {
          setLoading(false);
          setShowOverlay(false);
          navigate('/learnerPerformance', { state: { learnerData: filteredLearners } });
        } else {
          alert('Invalid Roll Number or Password');
          setLoading(false);
          setShowOverlay(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setShowOverlay(false);
      });
  };

  return (
    <>
      {showOverlay && <div className="overlay"></div>}

      <Container fluid className="login-container">
        <Col md={5} lg={4}>
          <Card className="login-card">
            <Card.Body>
              <img
                src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
                alt="Unacademy Logo"
                className="logo-image"
              />

              <h1 className="login-title">AHMEDABAD CENTRE</h1>
              <h2 className="login-title">Learner Login</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername" className="form-group-custom text-start">
                  <Form.Label className="text-start d-block fw-semibold">Roll Number</Form.Label>
                  <div className="input-with-icon">
                    <i className="fas fa-user icon"></i>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Roll Number"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="form-group-custom text-start">
                  <Form.Label className="text-start d-block fw-semibold">Password</Form.Label>
                  <div className="input-with-icon">
                    <i className="fas fa-lock icon"></i>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                    <i
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="submit-button mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" variant="light" size="sm" /> Logging in...
                    </>
                  ) : (
                    'Show Report'
                  )}
                </Button>

                <div className="social-icons mt-4">
                  <a href="https://www.facebook.com/unacademyahmedabad/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.youtube.com/@UnacademyNEET" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="https://twitter.com/unacademy" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/unacademy.ahmedabad/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/unacademy" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default LoginForm;
