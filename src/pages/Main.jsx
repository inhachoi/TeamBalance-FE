import { useEffect, useState } from "react";
import styled from "styled-components";

//SECTION - 게임 진입 페이지
const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    gameTitle: "",
    choiceA: "",
    choiceB: "",
  });
  const [tmiList, setTmiList] = useState([
    {
      gameTitle: "여행 어디가지?",
      choiceA: "강원도",
      choieB: "제주도",
    },
    {
      gameTitle: "돈까스 좋아해?",
      choiceA: "일식",
      choieB: "경양식",
    },
    {
      gameTitle: "어떤 스타일이 좋아?",
      choiceA: "귀여운",
      choieB: "단아한",
    },
    {
      gameTitle: "리액트 좋아?",
      choiceA: "좋...아...",
      choieB: "응 싫어~",
    },
    {
      gameTitle: "음악 취향이?",
      choiceA: "팝송",
      choieB: "발라드",
    },
  ]);

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

  const handleAddTmi = () => {
    const { gameTitle, choiceA, choiceB } = values;
    if (gameTitle && choiceA && choiceB) {
      const newTmi = {
        gameTitle,
        choiceA,
        choiceB,
      };
      setTmiList([...tmiList, newTmi]);
      closeModal();
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
      <StHeader>
        {/* 헤더 부분 */}
        <StLogo src="/teamBalanceLogo.png" />
        <div>
          <StNickName>AA님</StNickName>
          <StLogoutButton>로그아웃</StLogoutButton>
        </div>
      </StHeader>

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
            <StTmi key={index}>{tmi.gameTitle}</StTmi>
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
