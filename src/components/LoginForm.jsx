import React, { useState } from 'react';
import { Container,  Col, Form, Button, Card, Spinner } from 'react-bootstrap'; // Import Spinner
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showOverlay, setShowOverlay] = useState(false); // For background overlay

  const navigate = useNavigate(); // useNavigate hook for routing

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Show spinner
        setShowOverlay(true); // Show background overlay

// Fetch data from an API (replace with actual API URL)
    fetch('https://sheetdb.io/api/v1/131pnl5khpeib') // Sample mock API URL (replace with your actual URL)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // Filter learners based on username and password
        const filteredLearners = data.filter(
          (learner) =>
            learner.RollNo && learner.Password &&
            learner.RollNo === trimmedUsername && learner.Password === trimmedPassword
        );

        if (filteredLearners.length > 0) {
          // After filtering, navigate and pass learnerData through state
          setLoading(false); // Hide spinner after fetching
          setShowOverlay(false); // Hide background overlay
          
          navigate('/learnerPerformance', { state: { learnerData: filteredLearners } });
        } else {
          alert('Invalid username or password');
          setLoading(false); // Hide spinner if login fails
          setShowOverlay(false); // Hide overlay if login fails
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setShowOverlay(false);
      });
  };

  return (
    <>
      {/* Background Overlay */}
      {showOverlay && <div className="overlay"></div>}
                         
      <Container fluid className="login-container">
        <Col md={4}>
          <Card className="login-card">
            <Card.Body>
              
<img    src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
          alt="Unacademy logo"
          style={{ maxWidth: '300px', display: "Block", maxHeight: '150px', margin: '-10px auto 40px'}}
        />    <head1 className="text-center login-title">AHMEDABAD CENTRE</head1>
       
              <h2 className="text-center login-title">Learner Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername" className="form-group-custom">
                  <Form.Label>Learner Roll Number:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Unacademy RollNo:"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="form-group-custom">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block="true" className="submit-button">
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    'Show-Report'
                                       
                  )}
                  
                </Button>
                <div class="css-1c84t2p"><a href="https://www.facebook.com/unacademyahmedabad/" rel="noopener noreferrer" target="_blank"><svg class="css-a1vwta" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.8945 17.5V12.4824H14.6635L14.9284 10.5269H12.8945V9.27847C12.8945 8.71232 13.0597 8.3265 13.9124 8.3265L15 8.32605V6.57707C14.8119 6.55324 14.1663 6.5 13.4152 6.5C11.8471 6.5 10.7735 7.41129 10.7735 9.08481V10.5269H9V12.4824H10.7735V17.5H12.8945Z" fill="currentcolor"></path></svg></a><a href="https://www.youtube.com/@UnacademyNEET" rel="noopener noreferrer" target="_blank"><svg class="css-a1vwta" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.50979 8.08183C10.1593 7.97294 13.8384 7.9725 15.4902 8.08183C17.2782 8.2005 17.4867 9.25115 17.5 12C17.4867 14.7537 17.2763 15.7999 15.4902 15.9182C13.8384 16.0275 10.1598 16.0271 8.50979 15.9182C6.72183 15.7995 6.51329 14.7489 6.5 12C6.51329 9.24626 6.72367 8.20005 8.50979 8.08183ZM10.6261 10.2241V13.7796L14.2927 11.9988L10.6261 10.2241Z" fill="currentcolor"></path></svg></a><a href="https://twitter.com/unacademy" rel="noopener noreferrer" target="_blank"><svg class="css-a1vwta" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.5 8.56547C17.0953 8.74636 16.6603 8.86818 16.2038 8.92309C16.67 8.64207 17.0279 8.19678 17.1961 7.66612C16.7603 7.92637 16.2772 8.11557 15.7629 8.21755C15.3518 7.77594 14.7647 7.5 14.1157 7.5C12.6586 7.5 11.588 8.86864 11.917 10.2894C10.042 10.1948 8.37917 9.2904 7.26588 7.91576C6.67463 8.93694 6.95925 10.2728 7.96392 10.9493C7.5945 10.9373 7.24617 10.8353 6.94229 10.665C6.91754 11.7176 7.66692 12.7023 8.75225 12.9215C8.43463 13.0083 8.08675 13.0286 7.73292 12.9603C8.01983 13.8628 8.85308 14.5195 9.84125 14.5379C8.8925 15.2869 7.69717 15.6214 6.5 15.4793C7.49871 16.1239 8.68533 16.5 9.9595 16.5C14.1496 16.5 16.5169 12.9372 16.3739 9.74169C16.8148 9.42099 17.1975 9.02092 17.5 8.56547Z" fill="currentcolor"></path></svg></a><a href="https://www.instagram.com/unacademy.ahmedabad/" rel="noopener noreferrer" target="_blank"><svg class="css-a1vwta" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.5C10.5063 6.5 10.3193 6.50642 9.73263 6.533C7.73521 6.62467 6.62513 7.73292 6.53346 9.73217C6.50642 10.3193 6.5 10.5063 6.5 12C6.5 13.4937 6.50642 13.6812 6.533 14.2678C6.62467 16.2653 7.73292 17.3753 9.73217 17.467C10.3193 17.4936 10.5063 17.5 12 17.5C13.4937 17.5 13.6812 17.4936 14.2678 17.467C16.2634 17.3753 17.3763 16.2671 17.4665 14.2678C17.4936 13.6812 17.5 13.4937 17.5 12C17.5 10.5063 17.4936 10.3193 17.467 9.73263C17.3772 7.73704 16.2675 6.62513 14.2683 6.53346C13.6812 6.50642 13.4937 6.5 12 6.5ZM12.0013 7.49121C13.4698 7.49121 13.6439 7.49671 14.2242 7.52329C15.7147 7.59113 16.4109 8.29834 16.4787 9.77784C16.5053 10.3576 16.5104 10.5318 16.5104 12.0003C16.5104 13.4693 16.5049 13.643 16.4787 14.2228C16.4104 15.7009 15.7161 16.4095 14.2242 16.4773C13.6439 16.5039 13.4707 16.5094 12.0013 16.5094C10.5328 16.5094 10.3586 16.5039 9.77881 16.4773C8.28465 16.409 7.5921 15.6986 7.52427 14.2223C7.49769 13.6425 7.49219 13.4688 7.49219 11.9998C7.49219 10.5313 7.49815 10.3576 7.52427 9.77738C7.59256 8.29834 8.28694 7.59067 9.77881 7.52284C10.3591 7.49671 10.5328 7.49121 12.0013 7.49121ZM9.1757 11.9999C9.1757 10.4402 10.4402 9.1757 11.9999 9.1757C13.5597 9.1757 14.8242 10.4402 14.8242 11.9999C14.8242 13.5601 13.5597 14.8247 11.9999 14.8247C10.4402 14.8247 9.1757 13.5597 9.1757 11.9999ZM12.0013 13.8327C10.9888 13.8327 10.168 13.0123 10.168 11.9993C10.168 10.9869 10.9888 10.166 12.0013 10.166C13.0138 10.166 13.8346 10.9869 13.8346 11.9993C13.8346 13.0123 13.0138 13.8327 12.0013 13.8327ZM14.2734 9.0643C14.2734 8.69992 14.5691 8.4043 14.9339 8.4043C15.2983 8.4043 15.5934 8.69992 15.5934 9.0643C15.5934 9.42867 15.2983 9.7243 14.9339 9.7243C14.5691 9.7243 14.2734 9.42867 14.2734 9.0643Z" fill="currentcolor"></path></svg></a><a href="https://www.linkedin.com/company/unacademy" rel="noopener noreferrer" target="_blank"><svg class="css-a1vwta" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.1476 9.23359C7.51412 9.23359 7 8.73344 7 8.1168C7 7.50015 7.51412 7 8.1476 7C8.78107 7 9.2952 7.50015 9.2952 8.1168C9.2952 8.73344 8.78173 9.23359 8.1476 9.23359ZM9.13116 16.9997H7.16385V10.0355H9.13116V16.9997ZM15.0338 17H17.0011V12.7208C17.0011 9.39513 13.3261 9.51606 12.4107 11.1533V10.0358H10.4434V17H12.4107V13.4521C12.4107 11.4812 15.0338 11.3198 15.0338 13.4521V17Z" fill="currentcolor"></path></svg></a></div>
                </Form>
              </Card.Body>
           </Card>
        </Col>
    </Container>
   
    </>
  );
};






export default LoginForm;