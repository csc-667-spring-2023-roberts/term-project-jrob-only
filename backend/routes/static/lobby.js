const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  const { user } = request.session;

  response.render("lobby", {
    title: "Jrob's Term Project",
    ...user,
  });
});

module.exports = router;
