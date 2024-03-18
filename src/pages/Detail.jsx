import React from "react";
import GameChoicePercent from "../components/game/GameChoisePercent";
// import CommentList from "../components/comments/CommentList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGame } from "../axios/tmiGames";

//SECTION - 게임 결과에 대한 상세 페이지
const Detail = () => {
  const { id } = useParams();
  console.log("상세 id > ", id);

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
