import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from '@emailjs/browser';
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer"
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Save to MongoDB
      const res = await axios.post("http://localhost:5000/register", form);
      alert(res.data.message);

      // Send email only to customers
      if (form.role === "customer") {
        const templateParams = {
          username: form.username,
          email: form.email,
          message: `Hi ${form.username}, you have successfully registered to Movies Management.`
        };

        try {
          await emailjs.send(
            "service_nvf3nrk",
            "template_3cucjbb",
            templateParams,
            "MYqauP_j2_S-uC2PU"
          );
          console.log("Email sent successfully");
        } catch (error) {
          console.error("Failed to send email:", error);
        }
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4 text-primary">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              placeholder="Enter username"
              required
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              placeholder="Enter password"
              required
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Role</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="owner"
                checked={form.role === "owner"}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <label className="form-check-label">Owner</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="customer"
                checked={form.role === "customer"}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <label className="form-check-label">Customer</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <button
          className="btn btn-link w-100 mt-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
