const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ================== MongoDB Connection ==================
mongoose.connect("mongodb://127.0.0.1:27017/user-heirarchy")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ================== Schemas ==================
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  hero: { type: String, required: true },
  musicDirector: { type: String, required: true }
});
const Movie = mongoose.model("Movie", movieSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, trim: true },
  email: String,
  password: String,
  role: { type: String, enum: ["owner", "customer"], required: true },
});
const User = mongoose.model("User", userSchema);

const assignedMovieSchema = new mongoose.Schema({
  customerUsername: { type: String, required: true, lowercase: true, trim: true },
  movies: [
    {
      _id: String, // movie id from movies collection
      title: String
    }
  ]
});
const AssignedMovie = mongoose.model("AssignedMovie", assignedMovieSchema);

// ================== Movie Routes ==================
// Get all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

// Add new movie (Owner only)
app.post("/movies", async (req, res) => {
  try {
    const { title, director, hero, musicDirector } = req.body;
    if (![title, director, hero, musicDirector].every((f) => !!f?.trim())) {
      return res.status(400).json({ message: "All fields required" });
    }
    const movie = new Movie({ title, director, hero, musicDirector });
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie" });
  }
});

// ================== User Routes ==================
// Register
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ username: username.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const newUser = new User({
      username: username.toLowerCase(),
      email,
      password,
      role
    });
    await newUser.save();
    res.json({ message: "Registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: username.toLowerCase(),
      password
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    res.json({
      message: "Login successful",
      user: { username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// ================== Assigned Movies DB Routes ==================
// Assign movies to a customer (replace existing list)
app.post("/assigned-movies", async (req, res) => {
  try {
    const { username, movies } = req.body;
    if (!username || !Array.isArray(movies)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const normalizedUsername = username.toLowerCase();

    // Ensure customer exists
    const customer = await User.findOne({
      username: normalizedUsername,
      role: "customer"
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Upsert (create if not exists, update if exists)
    const assigned = await AssignedMovie.findOneAndUpdate(
      { customerUsername: normalizedUsername },
      { customerUsername: normalizedUsername, movies },
      { upsert: true, new: true }
    );

    res.json({ message: "Movies assigned successfully", assigned });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error assigning movies" });
  }
});

// app.get('/assigned-movies', (req, res) => {
//   // Example dummy data
//   const assignedMovies = {
//     "John": [{ title: "Inception" }],
//     "Jane": [{ title: "Interstellar" }]
//   };
//   res.json(assignedMovies);
// });

// // Get assigned movies for a customer
// app.get("/assigned-movies/:username", async (req, res) => {
//   try {
//     const assigned = await AssignedMovie.findOne({
//       customerUsername: req.params.username.toLowerCase()
//     });
//     if (!assigned) {
//       return res.json([]);
//     }
//     res.json(assigned.movies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching assigned movies" });
//   }
// });

// ================== Start Server ==================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
