// import FetchDataComponent from "./components/FetchDataComponent";
import LoginForm from "./components/LoginForm";
import LearnerPerformance from "./components/LearnerPerformance";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminDashboard from './components/AdminDashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/learnerPerformance" element={<LearnerPerformance/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
