const db = require("./connection.js");

const CREATE_GAME_SQL =
  "INSERT INTO games (completed) VALUES (false) RETURNING id";
const INSERT_FIRST_USER_SQL =
  "INSERT INTO game_users (user_id, game_id, current_player) VALUES ($1, $2, true)";

const create = async (creator_id) => {
  const { id } = await db.one(CREATE_GAME_SQL);
  await db.none(INSERT_FIRST_USER_SQL, [creator_id, id]);

  return { id };
};

module.exports = { create };
