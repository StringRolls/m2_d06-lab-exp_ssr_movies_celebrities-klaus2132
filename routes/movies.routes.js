const router = require("express").Router();

const app= require("../app")

const Movie= require("../models/Movie.model")
const Celebrity= require("../models/Celebrity.model");
const { route } = require(".");

router
  .route("/movies/create")
  .get((req, res) => {
      Celebrity.find()
      .then((celebrities) => {
        res.render("movies/new-movie", { celebrities });
      })
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => res.redirect("/movies"))
      .catch((err) => res.render("movies/new-movie"));
  });

  router.get("/movies", (req, res) => {
      Movie.find()
      .then((movies) => res.render("movies/movies", { movies }))
      .catch((err) => {
          console.log("i cant find the movie mf", err)
          res.redirect("/movies")
      })
  })

  router.get("/movies/:id", (req, res) => {
      Movie.findById(req.params.id)
        .populate("cast")
        .then((movies) => res.render("movies/movie-details", { movies }))
        .catch((err) => console.log(err))
  })

  router.post("/movies/:id/delete", (req, res) => {
      const { id } = req.params;

      Movie.findByIdAndRemove(id)
      .then(() => res.redirect("/movies"))
      .catch((err) => console.log(err))
  })

  router
.route("/movies/:id/edit")
.get((req, res) => {
    const { id } = req.params;

    Movie.findById(id)
    .populate("cast")
    .then((movie) =>{
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/edit-movie", {
            movies: movie,
            celebrities: {celebrities}
        })
    })
})
})
.post((req, res) => {
const { id } = req.params;
const { title, genre, plot, cast } = req.body;

Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
.then(() => res.redirect(`/movies`))
.catch((err) => console.log(err))
})



module.exports = router;