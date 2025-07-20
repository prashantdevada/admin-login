import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Button, Table, Form, Spinner } from 'react-bootstrap';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [filteredLearners, setFilteredLearners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchRollNo, setSearchRollNo] = useState('');
  const reportRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not navigated via login (no location.state), force logout
    if (!location.state || !location.state.isAuthenticated) {
      navigate('/login');
    }
  }, [location, navigate]);

  const handleSearch = () => {
    if (!searchRollNo) return;
    setLoading(true);
    fetch('https://sheetdb.io/api/v1/131pnl5khpeib')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (learner) => learner.RollNo && learner.RollNo.trim() === searchRollNo.trim()
        );
        setFilteredLearners(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching learner data:', err);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <Container className="mt-5 text-center">
      <Card className="p-4 shadow-sm">

        <div className="d-flex justify-content-end mb-3">
          <Button variant="outline-danger" onClick={handleLogout}>🚪 Logout</Button>
        </div>

        <Form className="d-flex justify-content-center mb-4 print-only-hide">
          <Form.Control
            type="text"
            placeholder="Enter Roll Number"
            value={searchRollNo}
            onChange={(e) => setSearchRollNo(e.target.value)}
            className="me-3 w-50 text-center"
          />
          <Button variant="primary" onClick={handleSearch}>🔍 Search</Button>
        </Form>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filteredLearners.length > 0 ? (
          <div className="report-container">
            <Button
              className="mb-3 print-only-hide"
              onClick={() => window.print()}
              variant="secondary"
            >
              🖨️ Print Report
            </Button>

            <div ref={reportRef} className="report-print-wrapper">
              {/* Report Content */}
              <div className="text-center mb-4">
                <img
                  src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
                  alt="Unacademy Logo"
                  style={{ height: '60px' }}
                />
                <h2 className="mt-3">AHMEDABAD CENTRE</h2>
              </div>

              <div className="section-title">Learner Information</div>
              <Table bordered hover responsive size="sm" className="text-center table-bordered table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Learner Name</th>
                    <th>Batch Name</th>
                    <th>Roll No</th>
                    <th>Contact No</th>
                    <th>Session</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{filteredLearners[0]["Student Name"]}</td>
                    <td>{filteredLearners[0].Batch}</td>
                    <td>{filteredLearners[0].RollNo}</td>
                    <td>{filteredLearners[0]["Contact No"]}</td>
                    <td>2025-26</td>
                  </tr>
                </tbody>
              </Table>

              {/* Performance Report */}
              <div className="section-title">Learner Performance Report</div>
              <Table bordered hover responsive size="sm" className="text-center table-bordered table-striped">
                <thead className="table-warning">
                  <tr>
                    <th>S.NO.</th>
                    <th>EXAM DATE</th>
                    <th>TEST NAME</th>
                    <th>PHY</th>
                    <th>CHEM</th>
                    <th>MATH</th>
                    <th>BIO</th>
                    <th>TOTAL</th>
                    <th>%AGE</th>
                    <th>RANK</th>
                    <th>MAX. MARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLearners.map((learner, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{learner["Exam Date"]}</td>
                      <td>{learner["TestName"]}</td>
                      <td>{learner["Phy"]}</td>
                      <td>{learner["Chem"]}</td>
                      <td>{learner["Math"]}</td>
                      <td>{learner["Bio"]}</td>
                      <td>{learner["Total"]}</td>
                      <td>{learner["%AGE"]}</td>
                      <td>{learner["Rank"]}</td>
                      <td>{learner["Max. Marks"]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          searchRollNo && (
            <div className="text-center text-danger">
              No data found for Roll No: {searchRollNo}
            </div>
          )
        )}
      </Card>
    </Container>
  );
};

export default AdminDashboard;