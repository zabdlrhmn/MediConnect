import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (role === "patient") {
      navigate("/doctors");
      return;
    }

    
    if (!password.trim()) {
      alert("Please enter the doctor password.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, password }),
    });

    const data = await res.json();

    if (data.success) {
      
      navigate("/patients");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <label className="form-label">Login as:</label>

          <select
            className="form-select mb-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          {role === "doctor" && (
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Doctor Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
