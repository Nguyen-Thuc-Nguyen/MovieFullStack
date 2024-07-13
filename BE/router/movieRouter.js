
import express from 'express';
import upload from '../middleware/multer.js';
import Movie from '../model/movie.js';
import cloudinary from '../config/cloudinaryConfig.js';

const movieRouter = express.Router();

movieRouter.post('/createMovie', async (req, res) => {
  try {
    const { ID, name, time, year, image, introduce } = req.body;
    const newMovie = new Movie({ ID, name, time, year, image, introduce });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all movies
movieRouter.get('/allMovie', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a movie by ID
movieRouter.put('/updateMovie/:id', async (req, res) => {
  try {
    const { name, time, year, image, introduce } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { ID: req.params.id },
      { name, time, year, image, introduce },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a movie by ID
movieRouter.delete('/deleteMovie/:id', async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ ID: req.params.id });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

movieRouter.get('/searchMovie', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }
    const movies = await Movie.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
    res.status(200).json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
})

movieRouter.get('/ascMovies', async (req, res) => {
  const { sort = 'asc' } = req.query;
  try {
    const movies = await Movie.find().sort({ year: sort === 'desc' ? -1 : 1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});
movieRouter.post('/upload/:id/image', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Update movie record in the database with new image URL
    const movieId = req.params.id;
    const movie = await Movie.findOneAndUpdate(
      { ID: movieId },
      { image: result.secure_url },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return res.json(movie);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

export default movieRouter;

