const express = require("express");

const router = express.Router();

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const { user } = request.session;

  response.render("games", { id, title: "Jrob's Term Project", ...user });
});

module.exports = router;
