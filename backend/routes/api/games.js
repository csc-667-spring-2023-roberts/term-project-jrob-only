const express = require("express");
const Games = require("../../db/games.js");
const { GAME_CREATED, GAME_UPDATED } = require("../../../shared/constants.js");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;

  try {
    const available_games = await Games.list(user_id);

    response.json(available_games);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.get("/create", async (request, response) => {
  const { id: user_id } = request.session.user;
  const io = request.app.get("io");

  try {
    const { id: game_id, created_at } = await Games.create(user_id);

    io.emit(GAME_CREATED, { game_id, created_at });
    response.redirect(`/games/${game_id}`);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.get("/:id/join", async (request, response) => {
  const { id: game_id } = request.params;
  const { id: user_id } = request.session.user;
  const io = request.app.get("io");

  try {
    await Games.join(game_id, user_id);

    const state = await Games.state(game_id);

    state.user_id = user_id;
    state.users[0].letter = "X";
    state.users[1].letter = "O";

    io.emit(GAME_UPDATED(game_id), state);

    response.redirect(`/games/${game_id}`);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

module.exports = router;
