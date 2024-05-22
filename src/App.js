import "./App.css";
import Layout from "./components/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/LandingPage"; // Import your ContactPage component
import SingleVenuePage from "./pages/SingleVenuePage"; // Import your ContactPage component
import Register from "./pages/RegisterPage"; // Import your ContactPage component
import Login from "./pages/LoginPage"; // Import your ContactPage component
import Test from "./pages/testpage"; // Import your ContactPage component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/SingleVenuePages/:id"
            element={<SingleVenuePage />}
          />{" "}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Test" element={<Test />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
