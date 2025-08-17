import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState("Customer");
  const [loading, setLoading] = useState(true);
  const [titleSearch, setTitleSearch] = useState("");
  const [directorSearch, setDirectorSearch] = useState("");
  const [heroSearch, setHeroSearch] = useState("");
  const [musicDirectorSearch, setMusicDirectorSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username);
    }
    axios.get("http://localhost:5000/movies")
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch movies", err);
        setLoading(false);
      });
  }, []);

  // Filter movies by all four search terms (empty fields do not filter)
  const filteredMovies = movies.filter(movie => {
    return (!titleSearch || movie.title.toLowerCase().includes(titleSearch.toLowerCase())) &&
           (!directorSearch || movie.director.toLowerCase().includes(directorSearch.toLowerCase())) &&
           (!heroSearch || movie.hero.toLowerCase().includes(heroSearch.toLowerCase())) &&
           (!musicDirectorSearch || movie.musicDirector.toLowerCase().includes(musicDirectorSearch.toLowerCase()));
  });

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center text-primary mb-3">
          Welcome, {username} 👋
        </h2>
        <div className="text-end mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Search Inputs */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by movie title..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by director..."
            value={directorSearch}
            onChange={(e) => setDirectorSearch(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by hero..."
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by music director..."
            value={musicDirectorSearch}
            onChange={(e) => setMusicDirectorSearch(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Movies</label>
          <ul className="list-group">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <li key={movie._id} className="list-group-item">
                  <div><strong>Title:</strong> {movie.title}</div>
                  <div><strong>Director:</strong> {movie.director}</div>
                  <div><strong>Hero:</strong> {movie.hero}</div>
                  <div><strong>Music Director:</strong> {movie.musicDirector}</div>
                </li>
              ))
            ) : (
              <div className="alert alert-info text-center mb-0">
                No movies found matching your criteria.
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
