import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { tmiGames, addGame } from "../../axios/tmiGames";
import {
  StModalOverlay,
  StModalForm, // 수정: StModalForm으로 변경
  StModalCloseButton,
  StModalInput,
  StTmiAddButton,
} from "../../pages/Main.module";

// 모달
export const Modal = ({ onClose }) => {
  const [gameTitle, setGameTitle] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");

  const handleGameTitleChange = (e) => {
    const gameTitle = e.target.value;
    setGameTitle(gameTitle);
  };
  const handleChoiceAChange = (e) => {
    const choiceA = e.target.value;
    setChoiceA(choiceA);
  };
  const handleChoiceBChange = (e) => {
    const choiceB = e.target.value;
    setChoiceB(choiceB);
  };

  const newGame = {
    gameTitle,
    choiceA,
    choiceB,
  };

  const { refetch } = useQuery({
    queryKey: ["games"],
    queryFn: tmiGames,
  });

  // 게임 추가 통신
  const addGameMutation = useMutation({
    mutationFn: addGame,
    onSuccess: async (data) => {
      await refetch();
      onClose();
    },
    onError: (error) => {
      // console.log("추가하기 실패 : ", error);
    },
  });

  // 추가 버튼 함수
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    addGameMutation.mutate(newGame);
    setGameTitle("");
    setChoiceA("");
    setChoiceB("");
    onClose();
  };

  return (
    <StModalOverlay>
      <StModalForm onSubmit={handleFormSubmit}>
        <StModalCloseButton onClick={onClose}>X</StModalCloseButton>
        <h2>TMI 밸런스 추가</h2>
        <div>
          주 제 &nbsp;
          <StModalInput
            type="text"
            name="gameTitle"
            value={gameTitle}
            onChange={handleGameTitleChange}
          />
        </div>
        <div>
          선택1{" "}
          <StModalInput
            type="text"
            name="choiceA"
            value={choiceA}
            onChange={handleChoiceAChange}
          />
        </div>
        <div>
          선택2{" "}
          <StModalInput
            type="text"
            name="choiceB"
            value={choiceB}
            onChange={handleChoiceBChange}
          />
        </div>
        <div>
          <StTmiAddButton type="submit">추가하기</StTmiAddButton>{" "}
        </div>
      </StModalForm>
    </StModalOverlay>
  );
};
