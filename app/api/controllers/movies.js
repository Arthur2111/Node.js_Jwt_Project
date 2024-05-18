const movieModel = require("../models/movies");

exports.getAll = (req, res, next) => {
  console.log("hello world");

  let moviesList = [];
  movieModel
    .find({})
    .then((movies) => {
      for (let i = 0; i < movies.length; i++) {
        moviesList.push({
          id: movies[i]._id,
          name: movies[i].name,
          released_on: movies[i].released_on,
        });
      }

      res.json({
        status: 200,
        message: "Successfully Retrieved!!",
        data: { movies: moviesList },
      });
    })
    .catch((e) => console.log(e));
};

exports.getById = (req, res, next) => {
  console.log("hello world 123");
  movieModel
    .findById(req.params.movieId)
    .then((movieInfo) => {
      res.json({
        status: "success",
        message: "Movie found!!!",
        data: { movies: movieInfo },
      });
    })
    .catch((e) => console.log(e));
};

exports.updateById = (req, res, next) => {
  movieModel
    .findByIdAndUpdate(req.params.movieId, { name: req.body.name })
    .then((movie) => {
      res.json({
        status: 200,
        message: "Movie updated successfully!!!",
        data: null,
      });
    })
    .catch((e) => console.log(e));
};
exports.deleteById = (req, res, next) => {
  movieModel
    .findOneAndDelete(req.params.movieId)
    .then((movie) => {
      res.json({
        status: "success",
        message: "Movie successfully removed!!!",
        data: movie,
      });
    })
    .catch((e) => console.log(e));
};

exports.create = (req, res, next) => {
  movieModel
    .create({ name: req.body.name, released_on: req.body.released_on })
    .then((movie) => {
      res.json({
        status: "success",
        message: "Movie added successfully!!!",
        data: movie,
      });
    })
    .catch((e) => console.log(e));
};
