const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../../db/users.js");

const router = express.Router();

const SALT_ROUNDS = 10;

router.get("/register", (_request, response) => {
  response.render("register", { title: "Jrob's Term Project" });
});

router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const { id } = await Users.create(username, email, hash);

    response.redirect("/lobby");
  } catch (error) {
    console.log({ error });
    response.render("register", {
      title: "Jrob's Term Project",
      username,
      email,
    });
  }
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "Jrob's Term Project" });
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  try {
    const { password: hash } = await Users.findByEmail(email);
    const isValidUser = await bcrypt.compare(password, hash);

    if (isValidUser) {
      response.redirect("/lobby");
    } else {
      throw "Credentials invalid";
    }
  } catch (error) {
    console.log({ error });

    response.render("login", { title: "Jrob's Term Project", email });
  }
});

router.get("/logout", (_request, response) => {
  response.redirect("/");
});

module.exports = router;
