import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button, Spinner } from 'react-bootstrap';
import './LearnerPerformance.css';

const LearnerPerformance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const learnerData = location.state?.learnerData || [];
  const reportRef = useRef();
  const [omrLinks, setOmrLinks] = useState({});
  const [loadingLinks, setLoadingLinks] = useState(true);

  const OMR_BASE_API = "https://api.github.com/repos/prashantdevada/OMR-KEY/contents/OMR-KEY";
  const OMR_RAW_BASE = "https://raw.githubusercontent.com/prashantdevada/OMR-KEY/main/OMR-KEY";

  // Format decimal values as percentage
  const formatPercent = (val) => {
    if (val === null || val === undefined || val === '') return '-';
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return (num * 100).toFixed(2) + '%';
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!learnerData || learnerData.length === 0) return;

    const fetchOmrLinks = async () => {
      try {
        const res = await fetch(OMR_BASE_API);
        const folders = await res.json();
        const links = {};

        learnerData.forEach(learner => {
          const testID = learner.TestID;
          const rollNo = learner.RollNo;
          const folder = folders.find(f => f.type === 'dir' && f.name.startsWith(testID));
          if (folder) {
            links[`${testID}_${rollNo}`] = `${OMR_RAW_BASE}/${encodeURIComponent(folder.name)}/${testID}_${rollNo}.pdf`;
          } else {
            links[`${testID}_${rollNo}`] = null;
          }
        });

        setOmrLinks(links);
        setLoadingLinks(false);
      } catch (err) {
        console.error("Error fetching OMR links:", err);
        setLoadingLinks(false);
      }
    };

    fetchOmrLinks();
  }, [learnerData]);

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

  const GITHUB_USERNAME = "prashantdevada";
  const photoURL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/learner-photos/main/photos/${learnerInfo.RollNo}.jpeg`;

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

          {/* Learner Info */}
          <div className="section-title">Learner Information</div>
          <div className="table-responsive">
            <Table bordered hover size="sm" className="text-center learner-info-table">
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
                  <td>{learnerInfo['Student Name']}</td>
                  <td>{learnerInfo.Batch}</td>
                  <td>{learnerInfo.RollNo}</td>
                  <td>{learnerInfo['Contact No']}</td>
                  <td>2025-26</td>
                  <td className="learner-photo-cell">
                    <img
                      src={photoURL}
                      alt="Learner"
                      onError={(e) => e.currentTarget.src = "https://via.placeholder.com/80x100?text=No+Photo"}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Attendance */}
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
                  <td>{formatPercent(learnerInfo.APR)}</td>
                  <td>{formatPercent(learnerInfo.MAY)}</td>
                  <td>{formatPercent(learnerInfo.JUN)}</td>
                  <td>{formatPercent(learnerInfo.JUL)}</td>
                  <td>{formatPercent(learnerInfo.AUG)}</td>
                  <td>{formatPercent(learnerInfo.SEP)}</td>
                  <td>{formatPercent(learnerInfo.OCT)}</td>
                  <td>{formatPercent(learnerInfo.NOV)}</td>
                  <td>{formatPercent(learnerInfo.DEC)}</td>
                  <td>{formatPercent(learnerInfo.JAN)}</td>
                  <td>{formatPercent(learnerInfo.FEB)}</td>
                  <td>{formatPercent(learnerInfo.MAR)}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Performance */}
          <div className="section-title mt-4">Learner Performance Report</div>
          {loadingLinks && <Spinner animation="border" />}
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
                  <th>MM</th>
                  <th>Analysis</th>
                </tr>
              </thead>
              <tbody>
                {learnerData.map((learner, idx) => {
                  const key = `${learner.TestID}_${learner.RollNo}`;
                  const omrUrl = omrLinks[key];

                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{learner['Exam Date']}</td>
                      <td>{learner['TestName']}</td>
                      <td>{learner['Phy']}</td>
                      <td>{learner['Chem']}</td>
                      <td>{learner['Math']}</td>
                      <td>{learner['Bio']}</td>
                      <td>{learner['Total']}</td>
                      <td>{formatPercent(learner['%AGE'])}</td>
                      <td>{learner['Rank']}</td>
                      <td>{learner['Max. Marks']}</td>
                      <td>
                        {omrUrl ? (
                          <Button
                            variant="primary"
                            size="sm"
                            className="rounded-pill omr-btn"
                            href={omrUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📝
                          </Button>
                        ) : (
                          <span className="text-danger">Not Found</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

        </div>
      </Card>
    </Container>
  );
};

export default LearnerPerformance;
