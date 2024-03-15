import api from "./api";

const tmiGames = async () => {
  console.log("최경일");
  const response = await api.get("/games");
  console.log(response);
  return response;
};

const addGame = async (newGame) => {
  await api.post("/game", newGame);
};

export { tmiGames, addGame };
