import "./App.css";
import Layout from "./components/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./pages/LandingPage"; // Import your ContactPage component
import SingleVenuePage from "./pages/SingleVenuePage"; // Import your ContactPage component

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
