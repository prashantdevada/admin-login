import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
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
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setShowOverlay(true);

    const adminCredentials = {
      username: 'pune',
      password: 'pune123'
    };

    if (isAdmin) {
      if (username === adminCredentials.username && password === adminCredentials.password) {
        localStorage.setItem('isLoggedIn', 'true');
        setLoading(false);
        setShowOverlay(false);
        navigate('/adminDashboard', { state: { isAuthenticated: true }, replace: true });
      } else {
        alert('Invalid Admin credentials');
        setLoading(false);
        setShowOverlay(false);
      }
      return;
    }

    // ✅ Google Apps Script API URL (replace <deployment-id> with your deployment ID)
    const apiURL = `https://script.google.com/macros/s/AKfycbzUHIy97DMLk_51BXNH3VR7jCn-yrtyVZ583GetJtC7yppBY4LoGGIyelgShCfyXIA/exec?roll=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Login successful
          localStorage.setItem('isLoggedIn', 'true');
          setLoading(false);
          setShowOverlay(false);
          navigate('/learnerPerformance', { state: { learnerData: data }, replace: true });
        } else {
          alert('Invalid Roll Number or Password');
          setLoading(false);
          setShowOverlay(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Something went wrong. Please try again.');
        setLoading(false);
        setShowOverlay(false);
      });
  };

  return (
    <>
      {showOverlay && <div className="overlay"></div>}

      <Container fluid className="login-container">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="login-card">
            <Card.Body>
              <img
                src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
                alt="Unacademy Logo"
                className="logo-image"
              />

              <h1 className="login-title primary-title">DASHBOARD</h1>
              <h2 className="login-title secondary-title">{isAdmin ? 'STAFF LOGIN' : 'LEARNER LOGIN'}</h2>

              <div className="text-center mb-3">
                <Form.Check
                  type="switch"
                  id="login-toggle"
                  label={isAdmin ? 'Switch to Learner Login' : 'Switch to Staff Login'}
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                />
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="input-with-icon">
                  <FaUser className="icon" />
                  <Form.Control
                    type="text"
                    inputMode={isAdmin ? 'text' : 'numeric'}
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={isAdmin ? 'Enter Staff Username' : 'Unacademy Roll Number'}
                    required
                  />
                </div>

                <div className="input-with-icon mt-3 position-relative">
                  <FaLock className="icon" />
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="submit-button mt-1"
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

                {!isAdmin && (
                  <div className="social-icons mt-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default LoginForm;
