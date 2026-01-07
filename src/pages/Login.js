import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Login() {
    const [role, setRole] = useState("patient");
    const navigate = useNavigate();


    const handleLogin = () => {
        if (role === "patient") {
            navigate("/Doctors");
        } else {
            navigate("/Patients");
        }
    };


    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
  


                <div className="card p-4">
                    <label className="form-label">Login as:</label>
                    <select className="form-select mb-3" onChange={(e) => setRole(e.target.value)}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>


                    {role === "doctor" && (
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Doctor Password"
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