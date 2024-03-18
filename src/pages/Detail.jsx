import React, { useState, useEffect } from "react";
import GameChoicePercent from "../components/game/GameChoisePercent";
import CommentList from "../components/comments/CommentList";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {getGame} from '../axios/tmiGames'


//SECTION - 게임 결과에 대한 상세 페이지
const Detail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", id],
    queryFn: () => getGame(id),
  });

    console.log("Detail 페이지 > ",data);
    return (
      <>
        <GameChoicePercent data={data} />
        
  
      </>
    );
};


export default Detail;
