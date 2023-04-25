export function initializeBoard(game_id) {
  const board = document.querySelector("#game-board");

  board.addEventListener("click", (event) => {
    const { row, column } = event.target?.dataset || {};

    if (row === undefined || column === undefined) {
      return;
    }

    console.log({ row, column });

    fetch(`/api/games/${game_id}/move`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x: column, y: row }),
    });
  });
}
