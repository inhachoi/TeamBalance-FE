import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import api from "../axios/api";
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
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

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

  const queryClient = new QueryClient();

  // 게임 리스트 받아오기
  const getTmiGames = async () => {
    const response = await api.get("/games");
    return response.data; // 수정: response.data로 수정
  };

  const { data, isLoading, isError } = useQuery("games", getTmiGames); // 수정: 인수로 객체 형식의 옵션 전달

  // 게임 추가
  const addGame = async (value) => {
    try {
      const response = await api.post("/game", value);
      console.log(response);
      return response.data; // 수정: response.data로 수정
    } catch (error) {
      console.log(error.response);
    }
  };

  const addGameMutation = useMutation(addGame, {
    // 수정: useMutation 호출 형식 변경
    onSuccess: (data) => {
      console.log("게임추가 성공", data);
      if (data.status === 200) {
        alert("게임추가 성공!!!");
      }
    },
    onError: (error) => {
      console.log("게임 추가 오류 : ", error);
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

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
            <StTmi key={item.id}>
              {item.gameTitle}
              {/* <StDeleteButton onClick={() => handleDeleteTmi(tmi.id)}>
                X
              </StDeleteButton>   */}
            </StTmi>
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
