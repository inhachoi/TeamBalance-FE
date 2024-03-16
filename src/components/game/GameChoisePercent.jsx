import React, { useState, useEffect } from "react";
import { Container, OptionContainer } from "./Game.module";
import { Option } from "./Game.module";
import { VS } from "./Game.module";
import styled from "styled-components";
import { useParams } from 'react-router-dom';


const GameChoicePercent = () => {
  const [selectedOption, setSelectedOption] = useState(""); // 선택된 옵션
  const [isRunning, setIsRunning] = useState(false); // 게이지가 채워지고 있는지 여부
  const [filledA, setFilledA] = useState(0); // A 옵션의 게이지 채움 정도
  const [filledB, setFilledB] = useState(0); // B 옵션의 게이지 채움 정도
  const [gameTitle, setGameTitle] = useState(""); // API에서 가져온 게임 제목
  const [choiceA, setChoiceA] = useState(""); // API에서 가져온 선택 A
  const [choiceB, setChoiceB] = useState(""); // API에서 가져온 선택 B


  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/tmiList");
        const data = await response.json();
        // 데이터에서 해당 ID를 가진 게임 데이터를 찾습니다.
        const gameDataById = data.find(item => item.id === id);
      if (gameDataById) {
        setGameTitle(gameDataById.gameTitle);
        setChoiceA(gameDataById.choiceA);
        setChoiceB(gameDataById.choiceB);
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 선택된 옵션이 변경될 때마다 게이지를 채웁니다.
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (filledA < 70) {
        setFilledA((prev) => prev + 1);
      }
      if (filledB < 30) {
        setFilledB((prev) => prev + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, selectedOption, filledA, filledB]);

  // 옵션 클릭 시 실행되는 함수
  const handleOptionClick = (option) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    setIsRunning(true); // 게이지 채움 시작
  };

  return (
    <div>
      <div>Balance Game</div>
      <Container>
        <div>{gameTitle}</div> {/* Display the fetched game title here */}
        <OptionContainer>
          <Option
            active={selectedOption === "A"}
            onClick={() => handleOptionClick("A")}
            className={selectedOption === "A" ? "selected" : ""}
            disabled={isRunning}
          >
            {choiceA}
          </Option>{" "}
          <VS> vs </VS>
          <Option
            active={selectedOption === "B"}
            onClick={() => handleOptionClick("B")}
            className={selectedOption === "B" ? "selected" : ""}
            disabled={isRunning}
          >
            {choiceB}
          </Option>
        </OptionContainer>
      </Container>

      <ProgressBarWrapper>
        <ProgressBarContainer>
          <ProgressBarFillA filled={filledA} active={selectedOption === "A"}></ProgressBarFillA>
          <ProgressBarFillB filled={filledB} active={selectedOption === "B"}></ProgressBarFillB>
        </ProgressBarContainer>
        <ProgressBarText>
          <div>{filledA}%,</div>
          <div>{filledB}%</div> 
        </ProgressBarText>
      </ProgressBarWrapper>
    </div>
  );
};

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 70%;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressBarFillA = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.filled}%;
  background-color: ${props => props.active ? '#5D47E7' : '#1B1A25'}; // A 옵션의 게이지 색상
  transition: width 0.5s;
`;

export const ProgressBarFillB = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${(props) => props.filled}%;
  background-color: ${props => props.active ? '#5D47E7' : '#1B1A25'}; // B 옵션의 게이지 색상
  transition: width 0.5s;
`;

const ProgressBarText = styled.span`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

export default GameChoicePercent;
