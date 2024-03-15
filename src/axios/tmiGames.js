import { instance } from "./api";

const tmiGames = async () => {
  console.log("최경일");
  const response = await instance.get("/games");
  console.log(response);
  return response;
};

const addGame = async (newGame) => {
  await instance.post("/game", newGame);
};

export { tmiGames, addGame };
