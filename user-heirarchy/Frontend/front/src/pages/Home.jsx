import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center p-4 border rounded shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h1 className="mb-3 text-primary">🎬 Movie Management</h1>
        <p className="mb-4">Welcome! Please log in or register to continue.</p>
        <div className="d-flex justify-content-around">
          <Link to="/login" className="btn btn-outline-primary px-4">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary px-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
