import { authInstance } from "./api";

const tmiGames = async () => {
  const response = await authInstance.get("/games");
  console.log(response);
  return response;
};

const addGame = async (newGame) => {
  console.log("choi");
  console.log(newGame);
  await authInstance.post("/game", newGame);
};

const getComment = async (id) => {
  await authInstance.get(`/game/${id}comment`);
};

const getGame = async (id) => {
  const response = await authInstance.get(`/game/${id}`);
  return response;
};
const deleteGame = async (id) => {
  await authInstance.delete(`/game/${id}`);
};

export { tmiGames, addGame, deleteGame, getComment, getGame };
