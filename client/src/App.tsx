import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/code/:code" element={<Stats />} />
      </Routes>
    </Router>
  );
};

export default App;
