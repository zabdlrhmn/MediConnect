import { useEffect, useState } from "react";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    console.log("Patients page loaded, starting fetch...");

    fetch("http://localhost:5000/api/patients")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched patients:", data);
        setPatients(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h3 className="mb-4">Patients List</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Disease</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.disease}</td>
                  <td>{p.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;
