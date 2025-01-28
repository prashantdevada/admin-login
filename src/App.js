// import FetchDataComponent from "./components/FetchDataComponent";
import LoginForm from "./components/LoginForm";
import LearnerPerformance from "./components/LearnerPerformance";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/learnerPerformance" element={<LearnerPerformance/>}/>
        </Routes>
    </Router>
  );
}

export default App;
