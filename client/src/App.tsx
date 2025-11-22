import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import { useScrollRestoration } from "./hooks/useScrollRestoration";

const App = () => {
  return (
    <>
      <Router>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

const ScrollManager = () => {
  useScrollRestoration();
  return null;
};
