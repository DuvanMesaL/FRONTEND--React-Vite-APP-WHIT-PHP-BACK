import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicRoutes from "./routes/PublicRoutes.jsx";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/app/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
