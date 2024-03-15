import React, { useState, useEffect } from "react";
import GameChoicePercent from "../components/game/GameChoisePercent";
import CommentList from "../components/comments/CommentList";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    fetchGameInfo(id);
  }, [id]);

  const fetchGameInfo = async (id) => {
    try {
      const response = await fetch(`http://3.34.181.200:8080/api/game/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch game info");
      }
      const data = await response.json();
      setGameInfo(data);
    } catch (error) {
      console.error("Error fetching game info:", error);
    }
  };

  if (!gameInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GameChoicePercent gameInfo={gameInfo} />
      <CommentList gameId={id} />
    </>
  );
};

export default Detail;
