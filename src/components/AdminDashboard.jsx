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
    if (!location.state || !location.state.isAuthenticated) {
      navigate('/login');
    }
  }, [location, navigate]);

  const handleSearch = () => {
    if (!searchRollNo) return;
    setLoading(true);
    fetch('https://sheetdb.io/api/v1/npig1v9r63hn6?ignore_cache=1')
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

  // Generate photo URL from GitHub repo
  const getPhotoURL = (rollNo) => {
    return `https://raw.githubusercontent.com/prashantdevada/learner-photos/main/photos/${rollNo}.jpeg`;
  };

  return (
    <Container className="mt-5 text-center">
      <Card className="p-4 shadow-sm">

        <div className="d-flex justify-content-end mb-3">
          <Button variant="outline-danger" onClick={handleLogout}>🚪 Logout</Button>
        </div>

        <Form className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2 mb-4 print-only-hide">
  <Form.Control
    type="text"
    placeholder="Unacademy Roll Number"
    value={searchRollNo}
    onChange={(e) => setSearchRollNo(e.target.value)}
    className="text-center"
    style={{ maxWidth: '280px' }}
  />
  <Button variant="primary" onClick={handleSearch}>
    🔍 Search
  </Button>
</Form>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filteredLearners.length > 0 ? (
          <div className="report-container">
            <div ref={reportRef} className="report-print-wrapper">
              <div className="text-center mb-4">
                <img
                  src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
                  alt="Unacademy Logo"
                  style={{ height: '60px' }}
                />
                <h2 className="mt-3">AHMEDABAD CENTRE</h2>
                <p className="centre-address">
                  Address: 1st and 2nd floor, Zion Z1, Sindhu Bhavan Marg, Near Maple County Road, Bodakdev, Ahmedabad, Gujarat 380054
                </p>
              </div>

              <div className="section-title">Learner Information</div>
              <Table bordered hover responsive size="sm" className="text-center learner-info-table">
                <thead>
                  <tr>
                    <th>Learner Name</th>
                    <th>Batch Name</th>
                    <th>Roll No</th>
                    <th>Contact No</th>
                    <th>Session</th>
                    <th>Learner Photo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{filteredLearners[0]["Student Name"]}</td>
                    <td>{filteredLearners[0].Batch}</td>
                    <td>{filteredLearners[0].RollNo}</td>
                    <td>{filteredLearners[0]["Contact No"]}</td>
                    <td>2025-26</td>
                    <td className="learner-photo-cell">
                      <img
                        src={getPhotoURL(filteredLearners[0].RollNo)}
                        alt="Learner"
                        onError={(e) => e.currentTarget.src = "https://via.placeholder.com/80x100?text=No+Photo"}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>

              <div className="section-title">Attendance Report 2025-26</div>
              <Table bordered hover responsive size="sm" className="text-center table-bordered">
                <thead className="table-success">
                  <tr>
                    <th>APR</th><th>MAY</th><th>JUN</th><th>JUL</th>
                    <th>AUG</th><th>SEP</th><th>OCT</th><th>NOV</th>
                    <th>DEC</th><th>JAN</th><th>FEB</th><th>MAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{filteredLearners[0].APR}</td>
                    <td>{filteredLearners[0].MAY}</td>
                    <td>{filteredLearners[0].JUN}</td>
                    <td>{filteredLearners[0].JUL}</td>
                    <td>{filteredLearners[0].AUG}</td>
                    <td>{filteredLearners[0].SEP}</td>
                    <td>{filteredLearners[0].OCT}</td>
                    <td>{filteredLearners[0].NOV}</td>
                    <td>{filteredLearners[0].DEC}</td>
                    <td>{filteredLearners[0].JAN}</td>
                    <td>{filteredLearners[0].FEB}</td>
                    <td>{filteredLearners[0].MAR}</td>
                  </tr>
                </tbody>
              </Table>

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

            <div className="text-center mt-4 print-only-hide">
              <Button variant="secondary" onClick={() => window.print()}>
                🖨️ Print Report
              </Button>
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
