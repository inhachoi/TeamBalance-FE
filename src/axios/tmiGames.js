import { authInstance } from "./api";

const tmiGames = async () => {
  // console.log("최경일");
  const response = await authInstance.get("/games");
  console.log(response);
  return response;
};

const addGame = async (newGame) => {
  console.log('choi');
  console.log(newGame)
  await authInstance.post("/game", newGame);
};

const deleteGame = async (id) => {
  await authInstance.delete(`/game/${id}`)
}

export { tmiGames, addGame, deleteGame };
