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

const getComment = async (id) => {
  await authInstance.get(`/game/${id}comment`)
}

const getGame = async (id) => {
  // console.log("getGame : ",id);
  // const response = await authInstance.get(`/game/${id}`)
  // console.log(response);
  // return response;
  return  await authInstance.get(`/game/${id}`);
}
const deleteGame = async (id) => {
  await authInstance.delete(`/game/${id}`);
}

export { tmiGames, addGame, deleteGame ,getComment,getGame };
