import React from 'react';
import { useLocation } from 'react-router-dom';
import './learnerperformance.css'; // Ensure this path is correct

const LearnerPerformance = () => {
  const location = useLocation();
  const learnerData = location.state?.learnerData; // Access learner data passed via state

  if (!learnerData || learnerData.length === 0) {
    return <div className="no-data-message">No data available. Please navigate from the dashboard.</div>;
  }

  const learnerInfo = learnerData[0]; // Assuming all rows belong to the same learner for the info section

  return (
    <>
      {/* Header Container for Logo - now only for centering the logo */}
      <div className="header-container">
        <img
          src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png" // Your logo URL
          alt="Unacademy Logo"
          className="logo" // This correctly applies the CSS class
        />
        {/* Print button removed as requested */}
      </div>

      {/* "Ahmedabad Centre" Heading */}
      <h1 className="center-heading">Ahmedabad Centre</h1>

      <div className="learner-performance"> {/* Main report content container */}
        {/* Learner Information Section */}
        <h2 className="section-title">LEARNER INFORMATION</h2>
        <div className="table-container">
          <table className="custom-table learner-info-table">
            <thead>
              <tr>
                <th>LEARNER NAME</th>
                <th>BATCH NAME</th>
                <th>ROLL NUMBER</th>
                <th>CONTACT NUMBER</th>
                <th>SESSION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{learnerInfo['Student Name']}</td>
                <td>{learnerInfo.Batch}</td>
                <td>{learnerInfo.RollNo}</td>
                <td>{learnerInfo.Password}</td> {/* Confirm 'Password' is actually Contact Number data */}
                <td>Session : 2025-26</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Learner Performance Report Section */}
        <h2 className="section-title">LEARNER PERFORMANCE REPORT</h2>
        <div className="table-container">
          <table className="custom-table performance-marks-table">
            <thead>
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
              {learnerData.map((learner, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{learner['Exam Date']}</td>
                  <td>{learner['TestName']}</td>
                  <td>{learner.Phy}</td>
                  <td>{learner.Chem}</td>
                  <td>{learner.Math}</td>
                  <td>{learner.Bio}</td>
                  <td>{learner.Total}</td>
                  <td>{learner['%AGE']}</td>
                  <td>{learner.Rank}</td>
                  <td>{learner['Max. Marks']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LearnerPerformance;
