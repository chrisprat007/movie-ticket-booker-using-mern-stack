import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Movie from "../models/Movie.js";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization?.split(" ")[1];
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // Verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
    }
  });

  // Create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
  if (!title || title.trim() === "" || !description || description.trim() === "" || !posterUrl || posterUrl.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    movie = new Movie({
      description,
      releaseDate: new Date(releaseDate),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });

    const adminUser = await Admin.findById(adminId).session(session); // Ensure to use the session

    if (!adminUser) {
      await session.abortTransaction(); // Abort transaction if adminUser is not found
      return res.status(404).json({ message: "Admin not found" });
    }

    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction(); // Abort transaction on error
    console.error(err);
    return res.status(500).json({ message: "Request Failed" });
  } finally {
    session.endSession(); // Ensure session is ended
  }

  return res.status(201).json({ movie });
};

export const getAllMovies = async (req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Request Failed" });
  }

  if (!movies) {
    return res.status(404).json({ message: "No movies found" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;

  try {
    movie = await Movie.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Request Failed" });
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};
