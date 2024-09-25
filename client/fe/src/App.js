import "./App.css";
import Layout from "./components/Layout";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/Edit/:id" element={<Edit />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
