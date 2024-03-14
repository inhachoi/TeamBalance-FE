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
  StModalBox,
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

  const [tmiList, setTmiList] = useState([]);

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

  // api 게임 추가
  const handleAddTmi = async () => {
    try {
      const response = await api.post("/api/games", values);
      const newGame = response.data;
      setTmiList([...tmiList, newGame]);
      closeModal();
    } catch (error) {
      console.error("게임 추가 중 에러 발생:", error);
    }
  };

  // api로 게임 리스트 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/games");
        setTmiList(response.data);
      } catch (error) {
        alert("게임 리스트를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchData();
  }, []);

  // api로 게임 삭제
  const handleDeleteTmi = async (id) => {
    try {
      await api.delete(`api/games/${id}`);
      const updatedTmiList = tmiList.filter((tmi) => tmi.id !== id);
      setTmiList(updatedTmiList);
    }catch(error) {
      alert("게임 삭제 중 에러 발생:", error);
    }
  }


  useEffect(() => {
    if (!isModalOpen) {
      setValues({
        gameTitle: "",
        choiceA: "",
        choiceB: "",
      });
    }
  }, [isModalOpen]);

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
          {tmiList.map((tmi, index) => (
            <StTmi key={index}>
              {tmi.gameTitle}
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
          onAddTmi={handleAddTmi}
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

  const handleAddClick = () => {
    onAddTmi();
  };

  return (
    <StModalOverlay>
      <StModalBox>
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
          <StTmiAddButton onClick={handleAddClick}>추가하기</StTmiAddButton>
        </div>
      </StModalBox>
    </StModalOverlay>
  );
};

export default Main;
