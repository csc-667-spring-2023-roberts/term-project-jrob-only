const express = require("express");

const router = express.Router();

router.get("/sign-up", (_request, response) => {
  response.render("sign-up", { title: "Jrob's Term Project" });
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "Jrob's Term Project" });
});

module.exports = router;
