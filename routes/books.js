const express = require("express");
const router = express.Router();

// instruction: import the book model
const Book = require("../models/book");

// instruction: import the review model
const Review = require("../models/review");

/* 
    instruction: 
    - setup GET /: Get all books (use populate() to get author details)
	- Filter books by genre or/and title
    - For instance, if a user wants to filter books by genre, the user can send a GET request to /books?genre=Mystery
*/
router.get("/", async (req, res) => {
  try {
    const { genre, title } = req.query;
    let filter = {};

    if (genre || title) {
      if (genre) {
        filter.genre = genre;
      }
      if (title) {
        filter.title = title;
      }
    }

    res.status(200).send(await Book.find(filter).populate("author"));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup GET /:id: Get a specific book by its _id (use populate() to get author details)
router.get("/:id", async (req, res) => {
  try {
    const data = await Book.findOne({ _id: req.params.id }).populate("author");
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup POST /: Add a new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      genre: req.body.genre,
      summary: req.body.summary,
    });
    await newBook.save();
    res.status(200).send(newBook);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup PUT /:id: Update a book by its _id
router.put("/:id", async (req, res) => {
  try {
    const b_id = req.params.id;
    const updateBook = await Book.findByIdAndUpdate(b_id, req.body, {
      new: true,
    });
    res.status(200).send(updateBook);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});
// instruction: setup DELETE /:id: Delete a book by its _id
router.delete("/:id", async (req, res) => {
  try {
    const b_id = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(b_id);
    res.status(200).send(deleteBook);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup GET /:id/reviews: Get all reviews for a book by its _id
router.get("/:id/reviews", async (req, res) => {
  try {
    res.status(200).send(await Review.find());
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup POST /:id/reviews: Add a review for a book using the book's _id
router.post("/:id/reviews", async (req, res) => {
  try {
    const b_id = req.params.id;
    const newReview = new Review({
      book: b_id,
      reviewerName: req.body.reviewerName,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    await newReview.save();
    res.status(200).send(newReview);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});
// instruction: export the router
module.exports = router;
