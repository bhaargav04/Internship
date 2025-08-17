import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [director, setDirector] = useState("");
  const [hero, setHero] = useState("");
  const [musicDirector, setMusicDirector] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddMovie = () => {
    if (!newMovie.trim()) return alert("Enter movie name");
    if (!director.trim()) return alert("Enter director name");
    if (!hero.trim()) return alert("Enter hero name");
    if (!musicDirector.trim()) return alert("Enter Music Director name");

    axios.post("http://localhost:5000/movies", {
      title: newMovie,
      director,
      hero,
      musicDirector
    })
      .then(res => {
        setMovies(prev => [...prev, res.data]);
        setNewMovie("");
        setDirector("");
        setHero("");
        setMusicDirector("");
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-4">Owner Dashboard</h2>
        <div className="text-end mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter movie name"
            value={newMovie}
            onChange={(e) => setNewMovie(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Director name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Hero name"
            value={hero}
            onChange={(e) => setHero(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Music Director name"
            value={musicDirector}
            onChange={(e) => setMusicDirector(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleAddMovie}>
            Add Movie
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Movies List:</label>
          <ul className="list-group">
            {movies.map((m) => (
              <li key={m._id} className="list-group-item">
                <div><strong>Title:</strong> {m.title}</div>
                <div><strong>Director:</strong> {m.director}</div>
                <div><strong>Hero:</strong> {m.hero}</div>
                <div><strong>Music Director:</strong> {m.musicDirector}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
