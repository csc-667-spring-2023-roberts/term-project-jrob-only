const express = require("express");

const router = express.Router();

router.get("/register", (_request, response) => {
  response.render("register", { title: "Jrob's Term Project" });
});

router.post("/register", (_request, response) => {
  response.render("register", { title: "Jrob's Term Project" });
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "Jrob's Term Project" });
});

router.get("/post", (_request, response) => {
  response.render("login", { title: "Jrob's Term Project" });
});

router.get("/logout", (_request, response) => {
  response.redirect("/");
});

module.exports = router;
