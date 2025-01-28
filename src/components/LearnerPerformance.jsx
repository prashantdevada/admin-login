import React from 'react';
import { useLocation } from 'react-router-dom';
import './learnerperformance.css';

  const handlePrint = () => {
    window.print();}
const LearnerPerformance = () => {
  const location = useLocation();
  const learnerData = location.state?.learnerData; // Access learner data passed via state

  if (!learnerData || learnerData.length === 0) {
    return <div>No data available</div>;
  }

  const learnerInfo = learnerData[0]; // Assuming all rows belong to the same learner

  return (
  <>
   
   <img
        src="https://v.fastcdn.co/u/67ec1086/61513884-0-Unacademy-Logo-RGB.png"
        alt="Unacademy Logo"
        style={{ maxWidth: '300px', display: 'Block', margin: '0 auto 10px' }}
        />
         <button className="print-button" onClick={handlePrint}>Print Report</button>
      <div className="content"></div>
      <h3 className="text-center login-title">Ahmedabad Centre</h3>
    <div className="learner-performance">
      <div className="table-container">
      <h1 className="table-title">Learner Information</h1>
        <table className="custom-table">
         <thead>
            <tr>
              <th>Learner Name</th>
              <th>Batch Name</th>
              <th>Roll Number</th>
              <th>Contact Number</th>
              <th>Session</th>            
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{learnerInfo['Student Name']}</td>
              <td>{learnerInfo.Batch}</td>
              <td>{learnerInfo.RollNo}</td>
              <td>{learnerInfo.Password}</td>
              <td>Session : 2024-25</td>               
            </tr>
          </tbody>
        </table>
       </div>

      <h1 className="table-title"> Learner Performance Report </h1>
      <div className="table-container1">
        <table className="custom-table1">
        <thead>
            <tr>
              <th>SNo.</th>
              <th>Exam Date</th>
              <th>Test Name</th>
              <th>Phy</th>
              <th>Chem</th>
              <th>Math</th>
              <th>Bot</th>
              <th>Zoo</th>
              <th>Total</th>
              <th>%Age</th>
              <th>Rank</th>
              <th>Max. Marks</th>
            </tr>
          </thead>
          <tbody>
            {learnerData.map((learner, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{learner['Exam Date']}</td>
                <td>{learner['TestName']}</td>
                <td>{learner.Phy}</td>
                <td>{learner.Chem}</td>
                <td>{learner.Math}</td>
                <td>{learner.Bot}</td>
                <td>{learner.Zoo}</td>
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