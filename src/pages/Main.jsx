import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { instance } from "../axios/api";
import { tmiGames, addGame, deleteGame } from "../axios/tmiGames";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  StMainBox,
  StTodayTmiBox,
  StTodayTmiChoiceA,
  StTodayTmiChoiceB,
  StVs,
  StTmiBox,
  StTmi,
  StDeleteButton,
  StAddModalOpenButton,
  StModalOverlay,
  StModalForm, // 수정: StModalForm으로 변경
  StModalCloseButton,
  StModalInput,
  StTmiAddButton,
} from "./Main.module";

//SECTION - 게임 진입 페이지
const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 데이터 받아오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ["games"],
    queryFn: tmiGames,
  });

  // 게임 삭제
  const deleteTmiMutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: (data) => {
      console.log("삭제 성공 : ", data);
    },
    onError: (error) => {
      console.log("삭제 실패 : ", error);
    },
  });

  // 삭제 버튼 함수
  const handleDeleteGame = async (e) => {
    deleteTmiMutation.mutate(e);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  const randomIndex = Math.floor(Math.random() * data.data.length);

  return (
    <>
      <Header />

      <StMainBox>
        {/* 가운데 부분 */}
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;🎉 추천 TMI 밸런스 게임 🎉</h2>
        <StTodayTmiBox>
          <h2>{data.data[randomIndex].gameTitle}</h2>
          <div>
            <StTodayTmiChoiceA>
              {data.data[randomIndex].choiceA}
            </StTodayTmiChoiceA>
            <StVs>VS</StVs>
            <StTodayTmiChoiceB>
              {data.data[randomIndex].choiceB}
            </StTodayTmiChoiceB>
          </div>
        </StTodayTmiBox>
      </StMainBox>

      <StTmiBox>
        {/* 밑 부분 */}
        <h2>&nbsp;&nbsp;모든 TMI 밸런스 게임 🔥</h2>
        <div>
          {data.data.length > 0 ? (
            data.data.map((item) => (
              <Link key={item.id} to={`/detail/${item.id}`}>
                <StTmi>
                  {item.gameTitle}
                  <StDeleteButton onClick={() => handleDeleteGame(item.id)}>
                    X
                  </StDeleteButton>
                </StTmi>
              </Link>
            ))
          ) : (
            <StTmi>No Data</StTmi>
          )}
        </div>
      </StTmiBox>

      {/* 게임 추가 버튼 (화면 밑부분에 고정) */}
      <StAddModalOpenButton onClick={openModal}>
        나만의 밸런스 게임 만들기!!!
      </StAddModalOpenButton>

      {/* 모달 */}
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};

// 모달
const Modal = ({ onClose }) => {
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

  // 게임 추가 통신
  const addGameMutation = useMutation({
    mutationFn: addGame,
    onSuccess: (data) => {
      console.log("추가하기 성공 : ", data);
      console.log(data);
      return onClose;
    },
    onError: (error) => {
      console.log("추가하기 실패 : ", error);
    },
  });

  // 추가 버튼 함수
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newGame);
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

export default Main;
