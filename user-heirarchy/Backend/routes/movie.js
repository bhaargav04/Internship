const express = require("express");
const User = require("../models/User");
const Movie = require("../models/Movie");
const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Assign movies to customer
router.post("/assign", async (req, res) => {
  const { customerId, assignedMovies } = req.body;
  await User.findByIdAndUpdate(customerId, { assignedMovies });
  res.json({ message: "Movies assigned successfully" });
});

// Get assigned movies for customer
router.get("/customer/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("assignedMovies"); // populate movie details
    res.json(user.assignedMovies || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

module.exports = router;
