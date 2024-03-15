import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import api from "../axios/api";
import { tmiGames, addGame } from "../axios/tmiGames";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  StMainBox,
  StTodayTmiBox,
  StTodayTmiChoiceA,
  StTodayTmiChoiceB,
  StVs,
  StTmiBox,
  StTmi,
  // StTmiDeleteButton,
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
  const [values, setValues] = useState({
    gameTitle: "",
    choiceA: "",
    choiceB: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // 데이터 받아오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ["games"],
    queryFn: tmiGames,
  });

  // 게임 추가
  const addGameMutation = useMutation({
    mutationFn: (newGame) => {
      return api.post("/game", newGame);
    },
  });

  // 게임 삭제
  const deleteTmiMutation = useMutation((id) => api.delete(`/games/${id}`));
  const handleDeleteTmi = (id) => {
    deleteTmiMutation.mutate(id);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setValues({
        gameTitle: "",
        choiceA: "",
        choiceB: "",
      });
    }
  }, [isModalOpen]);

  if (isLoading) {
    console.log(data);
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(data);
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Header />

      <StMainBox>
        {/* 가운데 부분 */}
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
        {/* 밑 부분 */}
        <h2>&nbsp;&nbsp;모든 TMI 밸런스 게임 🔥</h2>
        <div>
          {data.map((item) => (
            <Link key={item.id} to={`/detail/${item.id}`}>
              <StTmi>
                {item.gameTitle}
                {/* <StDeleteButton onClick={() => handleDeleteTmi(tmi.id)}>
                X
              </StDeleteButton>   */}
              </StTmi>
            </Link>
          ))}
        </div>
      </StTmiBox>

      {/* 게임 추가 버튼 (화면 밑부분에 고정) */}
      <StAddModalOpenButton onClick={openModal}>
        나만의 밸런스 게임 만들기!!!
      </StAddModalOpenButton>

      {/* 모달 */}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onAddTmi={addGameMutation}
          values={values}
          onChange={handleInputChange}
        />
      )}
    </>
  );
};

// 모달
const Modal = ({ onClose, onAddTmi, values, onChange }) => {
  const { gameTitle, choiceA, choiceB } = values;

  const handleFormSubmit = () => {
    onAddTmi();
  };

  return (
    <StModalOverlay>
      <StModalForm onSubmit={handleFormSubmit}>
        {" "}
        {/* 수정: form 태그 추가 */}
        <StModalCloseButton onClick={onClose}>X</StModalCloseButton>{" "}
        {/* 수정: onSubmit 제거 */}
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
          <StTmiAddButton type="submit">추가하기</StTmiAddButton>{" "}
          {/* 수정: type 속성 추가 */}
        </div>
      </StModalForm>
    </StModalOverlay>
  );
};

export default Main;
