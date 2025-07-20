  // LoginForm.jsx
  import React, { useState } from 'react';
  import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
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
        username: 'admin',
        password: 'admin123'
      };

      if (isAdmin) {
        if (username === adminCredentials.username && password === adminCredentials.password) {
          setLoading(false);
          setShowOverlay(false);
          navigate('/adminDashboard');
        } else {
          alert('Invalid Admin credentials');
          setLoading(false);
          setShowOverlay(false);
        }
        return;
      }

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

                <h1 className="login-title primary-title">AHMEDABAD CENTRE</h1>
                <h2 className="login-title secondary-title">{isAdmin ? 'STAFF LOGIN' : 'LEARNER LOGIN'}</h2>

                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <Form.Check
                    type="switch"
                    id="login-toggle"
                    label={isAdmin ? 'Switch to Learner Login' : 'Switch to Staff Login'}
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <div className="input-with-icon">
                      <span className="icon"><FaUser /></span>
                      <Form.Control
                        type="text"
                        inputMode={isAdmin ? 'text' : 'numeric'}
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={isAdmin ? 'Enter Staff Username' : 'Enter your Roll Number'}
                        required
                      />
                    </div>
                  </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <div className="input-with-icon">
                    <span className="icon"><FaLock /></span>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    
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

                  {!isAdmin && (
                    <div className="social-icons mt-4">
                      <a href="https://www.facebook.com/unacademyahmedabad/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://www.youtube.com/@UnacademyNEET" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a href="https://www.instagram.com/unacademy.ahmedabad/" target="_blank" rel="noopener noreferrer">
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
