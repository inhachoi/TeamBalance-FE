import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { instance } from "../axios/api";
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
  StAddModalOpenButton,
  StModalOverlay,
  StModalForm,
  StModalCloseButton,
  StModalInput,
  StTmiAddButton,
} from "./Main.module";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    gameTitle: "",
    choiceA: "",
    choiceB: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const fetchGames = async () => {
    const response = await instance.get("/games");
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const addGameMutation = useMutation({
    mutationFn: (newGame) => instance.post("/game", newGame),
  });

  const deleteGameMutation = useMutation((id) => instance.delete(`/games/${id}`));

  const handleDeleteGame = (id) => deleteGameMutation.mutate(id);

  useEffect(() => {
    if (!isModalOpen) {
      setValues({ gameTitle: "", choiceA: "", choiceB: "" });
    }
  }, [isModalOpen]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <Header />
      <StMainBox>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;🎉 오늘의 TMI 밸런스 게임 🎉</h2>
        <StTodayTmiBox>
          <h2>중식중에 뭐가 더 좋아?</h2>
          <div>
            <StTodayTmiChoiceA>짜장면</StTodayTmiChoiceA>
            <StVs>VS</StVs>
            <StTodayTmiChoiceB>짬뽕</StTodayTmiChoiceB>
          </div>
        </StTodayTmiBox>
      </StMainBox>

      <StTmiBox>
        <h2>&nbsp;&nbsp;모든 TMI 밸런스 게임 🔥</h2>
        <div>
          {data.map((item) => (
            <Link key={item.id} to={`/detail/${item.id}`}>
              <StTmi>{item.gameTitle}</StTmi>
            </Link>
          ))}
        </div>
      </StTmiBox>

      <StAddModalOpenButton onClick={openModal}>
        나만의 밸런스 게임 만들기!!!
      </StAddModalOpenButton>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onAddGame={addGameMutation}
          values={values}
          onChange={handleInputChange}
        />
      )}
    </>
  );
};

const Modal = ({ onClose, onAddGame, values, onChange }) => {
  const { gameTitle, choiceA, choiceB } = values;

  const handleFormSubmit = () => onAddGame.mutate(values);

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
            onChange={onChange}
          />
        </div>
        <div>
          선택1{" "}
          <StModalInput
            type="text"
            name="choiceA"
            value={choiceA}
            onChange={onChange}
          />
        </div>
        <div>
          선택2{" "}
          <StModalInput
            type="text"
            name="choiceB"
            value={choiceB}
            onChange={onChange}
          />
        </div>
        <div>
          <StTmiAddButton type="submit">추가하기</StTmiAddButton>
        </div>
      </StModalForm>
    </StModalOverlay>
  );
};

export default Main;
