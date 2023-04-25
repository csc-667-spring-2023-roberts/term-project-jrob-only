const db = require("./connection.js");

const CREATE_GAME_SQL =
  "INSERT INTO games (completed) VALUES (false) RETURNING *";
const INSERT_FIRST_USER_SQL =
  "INSERT INTO game_users (user_id, game_id, current_player) VALUES ($1, $2, true)";

const create = async (creator_id) => {
  const { id } = await db.one(CREATE_GAME_SQL);

  await db.none(INSERT_FIRST_USER_SQL, [creator_id, id]);

  const board = [];
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      board.push(
        `INSERT INTO game_moves (game_id, user_id, x_coordinate, y_coordinate) VALUES ($1, 0, ${row}, ${column})`
      );
    }
  }

  await Promise.all(board.map((query) => db.none(query, [id])));

  return { id };
};

const GAMES_LIST_SQL = `
  SELECT g.id, g.created_at FROM games g, game_users gu 
  WHERE g.id=gu.game_id AND gu.user_id != $1 AND 
  (SELECT COUNT(*) FROM game_users WHERE game_users.game_id=g.id) = 1
`;

const list = async (user_id) => db.any(GAMES_LIST_SQL, [user_id]);

const JOIN_GAME_SQL =
  "INSERT INTO game_users (game_id, user_id) VALUES ($1, $2)";

const join = (game_id, user_id) => db.none(JOIN_GAME_SQL, [game_id, user_id]);

const state = async (game_id) => {
  const users = await db.many(
    "SELECT users.username, users.id AS user_id FROM users, game_users WHERE users.id=game_users.user_id AND game_users.game_id=$1 ORDER BY game_users.created_at",
    [game_id]
  );

  const board = await db.many(
    "SELECT user_id, x_coordinate, y_coordinate FROM game_moves WHERE game_id=$1",
    [game_id]
  );

  return {
    game_id,
    users,
    board,
  };
};

module.exports = { create, list, join, state };
