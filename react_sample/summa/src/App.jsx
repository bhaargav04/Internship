import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
  const [input, setInput] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [tableData, setTableData] = useState([]);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/summaUser");
      // if (!res.ok) throw new Error("Failed to fetch");
      const users = await res.json();
      setTableData(users)
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Run once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: input,
      age: Number(age),
      mobile: String(mobile),
    };

    try {
      const res = await fetch("http://localhost:5000/summaUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      await res.json();
      fetchUsers(); // Refresh table after submit
      setInput("");
      setAge("");
      setMobile("");
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  return (
    <>
      <form className="form-control d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <label>Age :</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Number :</label>
        <input
          type="number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <table className="d-flex flex-column align-items-center justify-content-center mt-5">
        <thead className="border border-dark">
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody className="border border-dark">
          {tableData.length > 0 ? (
            tableData.map((a, idx) => (
              <tr key={a._id || idx}>
                <td>{idx + 1}</td>
                <td>{a.name}</td>
                <td>{a.age}</td>
                <td>{a.mobile}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
