//const res = require("express/lib/response");

const router = require("express").Router();

const app= require("../app")

const Celebrity= require("../models/Celebrity.model")

router.route("/celebrities/create")
.get((req, res)=> res.render("celebrities/new-celebrity"))

.post((req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
.then(()=>{
    res.redirect("/celebrities")
})
.catch((err)=>res.render("celebrities/new-celebrity"))
});


router.get("/celebrities", (req, res) => {
  //const {name} = req.body
  Celebrity.find()
  .then((celebrities) => res.render("celebrities/celebrities", {celebrities}))
  .catch((err) => {
      console.log("unable to find celebrity", err)
      res.redirect("/celebrities")
  })
})


module.exports = router;