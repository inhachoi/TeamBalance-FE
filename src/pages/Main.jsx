import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; 
import { NavLink } from "react-router-dom";


//SECTION - 게임 진입 페이지
const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    gameTitle: "",
    choiceA: "",
    choiceB: "",
  });
  const [tmiList, setTmiList] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tmiList");
        setTmiList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleAddTmi = async () => {
    const { gameTitle, choiceA, choiceB } = values;
    if (gameTitle && choiceA && choiceB) {
      try {
        const newTmi = {
          gameTitle,
          choiceA,
          choiceB,
        };
        await axios.post("http://localhost:5000/tmiList", newTmi);
        setTmiList(prevTmiList => [...prevTmiList, newTmi]); 
        closeModal();
      } catch (error) {
        console.error("Error adding new TMI:", error);
      }
    } else {
      alert("빈 칸을 채워주세요 ㅠㅠ");
    }
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

  return (
    <>
 


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
        <h2>&nbsp;&nbsp;모든 TMI 밸런스 게임 🔥</h2>
        <div>
          {tmiList.map((tmi, index) => (
            <NavLink key={index} to={`/detail/${tmi.id}`} activeClassName="active">
              {/* 각 게임 클릭시 네비게이션을 이용하여 디테일 페이지로 이동 */}
              <StTmi>{tmi.gameTitle}</StTmi>
            </NavLink>
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

// 본문 css
const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 30px 13px 30px;
  color: white;
  background-color: black;
`;
const StLogo = styled.img`
  width: 70px;
  height: 30px;
`;
const StNickName = styled.span`
  margin-right: 30px;
`;
const StLogoutButton = styled.button`
  width: 100px;
  height: 30px;
  color: white;
  background-color: #5d47e7;
  border-radius: 12px;
  cursor: pointer;
`;
const StMainBox = styled.div`
  background-color: #d9d9d9;
  padding: 10px;
`;
const StTodayTmiBox = styled.div`
  min-width: 970px;
  text-align: center;
  padding: 40px 0px 50px 0px;
  margin: 30px;
  background-color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f1ff;
  }
  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;
const StTodayTmiChoiceA = styled.button`
  width: 400px;
  height: 200px;
  margin: 40px 30px 30px 0px;
  color: white;
  border: none;
  background-color: #1a1c26;
  border-radius: 20px;
  font-size: 25px;
  cursor: pointer;
`;
const StTodayTmiChoiceB = styled.button`
  width: 400px;
  height: 200px;
  margin: 40px 0px 30px 30px;
  border: none;
  background-color: #5d47e7;
  border-radius: 20px;
  font-size: 25px;
  cursor: pointer;
`;
const StVs = styled.span`
  font-size: 30px;
  font-weight: bold;
`;
const StTmiBox = styled.div`
  min-height: 350px;
  padding: 20px 50px 50px 50px;
  color: white;
  background-color: black;
`;
const StTmi = styled.button`
  display: inline-block;
  justify-content: center;
  text-align: center;
  width: 150px;
  height: 150px;
  margin: 10px;
  padding: auto;
  background-color: white;
  border-radius: 10px;
  font-weight: 1000;
  cursor: pointer;
  &:hover {
    background-color: #f2f1ff;
  }
  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;
const StAddModalOpenButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 40px;
  color: white;
  background-color: #5d47e7;
  border-radius: 10px;
  cursor: pointer;
`;

// 모달 css
const StModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const StModalBox = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 400px;
  height: 350px;
  padding: 20px;
  color: #efefef;
  background-color: #1b1f30;
  border-radius: 10px;
`;
const StModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;
const StModalInput = styled.input`
  width: 250px;
  height: 30px;
  margin: 15px;
  border: none;
  border-radius: 10px;
`;
const StTmiAddButton = styled.button`
  width: 150px;
  height: 40px;
  margin-top: 20px;
  color: white;
  background-color: #5d47e7;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default Main;