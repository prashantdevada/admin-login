import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button } from 'react-bootstrap';
import './LearnerPerformance.css';

const LearnerPerformance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const learnerData = location.state?.learnerData;
  const reportRef = useRef();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  if (!learnerData || learnerData.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-4 shadow-sm">
          <div className="text-danger">No data available. Please navigate from the dashboard.</div>
        </Card>
      </Container>
    );
  }

  const learnerInfo = learnerData[0];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
    window.location.reload();
  };

  return (
    <Container className="mt-4 mb-5 text-center">
      <Card className="p-3 p-md-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3 print-only-hide flex-wrap gap-2">
          <Button variant="outline-danger" onClick={handleLogout}>🚪 Logout</Button>
          <Button variant="secondary" onClick={() => window.print()}>🖨️ Print Report</Button>
        </div>

        <div ref={reportRef} className="report-print-wrapper">
          <div className="text-center mb-3">
            <img
              src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
              alt="Unacademy Logo"
              style={{ height: '60px', maxWidth: '80%' }}
            />
            <h2 className="mt-2">AHMEDABAD CENTRE</h2>
            <p className="centre-address small">
              Address: 1st and 2nd floor, Zion Z1, Sindhu Bhavan Marg, near Maple County Road, Bodakdev, Ahmedabad, Gujarat 380054
            </p>
          </div>

          <div className="section-title">Learner Information</div>
          <div className="table-responsive">
            <Table bordered hover size="sm" className="text-center table-bordered table-striped">
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
                  <td>{learnerInfo['Student Name']}</td>
                  <td>{learnerInfo.Batch}</td>
                  <td>{learnerInfo.RollNo}</td>
                  <td>{learnerInfo['Contact No']}</td>
                  <td>2025-26</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="section-title mt-4">Attendance Report 2025-26</div>
          <div className="table-responsive">
            <Table bordered hover size="sm" className="text-center table-bordered">
              <thead className="table-success">
                <tr>
                  <th>APR</th><th>MAY</th><th>JUN</th><th>JUL</th>
                  <th>AUG</th><th>SEP</th><th>OCT</th><th>NOV</th>
                  <th>DEC</th><th>JAN</th><th>FEB</th><th>MAR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{learnerInfo.APR}</td>
                  <td>{learnerInfo.MAY}</td>
                  <td>{learnerInfo.JUN}</td>
                  <td>{learnerInfo.JUL}</td>
                  <td>{learnerInfo.AUG}</td>
                  <td>{learnerInfo.SEP}</td>
                  <td>{learnerInfo.OCT}</td>
                  <td>{learnerInfo.NOV}</td>
                  <td>{learnerInfo.DEC}</td>
                  <td>{learnerInfo.JAN}</td>
                  <td>{learnerInfo.FEB}</td>
                  <td>{learnerInfo.MAR}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="section-title mt-4">Learner Performance Report</div>
          <div className="table-responsive">
            <Table bordered hover size="sm" className="text-center table-bordered table-striped">
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
                {learnerData.map((learner, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{learner['Exam Date']}</td>
                    <td>{learner['TestName']}</td>
                    <td>{learner['Phy']}</td>
                    <td>{learner['Chem']}</td>
                    <td>{learner['Math']}</td>
                    <td>{learner['Bio']}</td>
                    <td>{learner['Total']}</td>
                    <td>{learner['%AGE']}</td>
                    <td>{learner['Rank']}</td>
                    <td>{learner['Max. Marks']}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default LearnerPerformance;
