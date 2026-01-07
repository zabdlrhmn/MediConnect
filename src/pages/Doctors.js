import doctors from "../data/doctors";


function Doctors() {
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
                        {doctors.map((doc) => (
                            <tr key={doc.id}>
                                <td>{doc.name}</td>
                                <td>{doc.specialty}</td>
                                <td>{doc.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Doctors;