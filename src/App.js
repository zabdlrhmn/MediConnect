import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* <-- make this the flex container */}
        <Navbar />
        <div className="content container mt-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/patients" element={<Patients />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
