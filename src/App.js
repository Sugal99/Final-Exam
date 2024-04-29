import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
