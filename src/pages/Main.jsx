import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { instance } from "../axios/api";
import { tmiGames, addGame } from "../axios/tmiGames";
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

  // // 게임 삭제
  // const deleteTmiMutation = useMutation((id) =>
  //   instance.delete(`/games/${id}`)
  // );

  // const handleDeleteTmi = (id) => {
  //   deleteTmiMutation.mutate(id);
  // };

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
    return <div>Loading...</div>;
  }
  if (isError) {
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
          {data.data.map((item) => (
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
          // onAddTmi={addGameMutation}
          values={values}
          onChange={handleInputChange}
        />
      )}
    </>
  );
};

// 모달
const Modal = ({ onClose, values, onChange }) => {
  const { newGame, gameTitle, choiceA, choiceB } = values;

  // 게임 추가 통신
  const addGameMutation = useMutation({
    mutationFn: addGame,
    onSuccess: (data) => {
      console.log("추가하기 성공 : ", data);
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
  };

  return (
    <StModalOverlay>
      <StModalForm onSubmit={handleFormSubmit}>
        {/* 수정: form 태그 추가 */}
        <StModalCloseButton onClick={onClose}>X</StModalCloseButton>
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
