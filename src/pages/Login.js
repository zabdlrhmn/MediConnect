import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (role === "doctor" && password.trim() === "") {
      alert("Please enter the doctor password.");
      return;
    }
    
    if (role === "patient") {
      navigate("/doctors");
      return;
    }

    // For doctor, verify password via backend
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setPassword("");
        navigate("/patients");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      console.error('Auth fetch failed, falling back to local check');
      // Fallback: allow plaintext doctor passwords (if backend unavailable)
      if (role === 'doctor') {
        const allowed = ['1','2','3','4'];
        if (allowed.includes(password)) {
          setPassword('');
          navigate('/patients');
          return;
        }
      }
      alert("Login failed");
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
              required
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
