import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log("Doctors page loaded, starting fetch...");

    fetch("http://localhost:5000/api/doctors")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched doctors:", data);
        setDoctors(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h3 className="mb-4">Doctors List</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.specialty}</td>
                  <td>{doc.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No doctors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Doctors;
