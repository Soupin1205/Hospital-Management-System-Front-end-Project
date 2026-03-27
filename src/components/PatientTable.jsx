import "../styles/main.css";

function PatientTable() {
  const data = [
    { name: "Sophie Bennett", id: "#26103", disease: "Stroke" },
    { name: "Liam Parker", id: "#26102", disease: "Arrhythmia" },
    { name: "Jackson Mitchell", id: "#26101", disease: "Viral Fever" },
  ];

  return (
    <div className="table-box">
      <div className="table-header">
        <h3>Patients List</h3>
        <button>Add Patient</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Disease</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.id}</td>
              <td>{p.disease}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
