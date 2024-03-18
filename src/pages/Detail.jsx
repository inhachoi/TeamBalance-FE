import React from "react";
import GameChoicePercent from "../components/game/GameChoisePercent";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGame } from "../axios/tmiGames";

const Detail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", id],
    queryFn: async () => {
      const data = await getGame(id);
      return data;
    },
  });

  if (isLoading) {
    return <div>is Loding...</div>;
  } else if (isError) {
    return <div> Error occured during fetching...</div>;
  } else {
    return (
      <>
        <GameChoicePercent data={data} />
      </>
    );
  }
};

export default Detail;
