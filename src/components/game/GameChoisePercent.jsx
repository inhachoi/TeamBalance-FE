import React, { useState, useEffect } from "react";
import { Container, OptionContainer, OptionTitle } from "./Game.module";
import { Option } from "./Game.module";
import { VS } from "./Game.module";
import styled from "styled-components";

const GameChoicePercent = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [filledA, setFilledA] = useState(0);
  const [filledB, setFilledB] = useState(0);

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
  }, [isRunning, filledA, filledB]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsRunning(true);
  };

  return (
    <div>
      <OptionContainer>
        <h1>{data.data.gameTitle}</h1>
        <Option
          active={selectedOption === "A"}
          onClick={() => handleOptionClick("A")}
          className={selectedOption === "A" ? "selected" : ""}
          disabled={isRunning}
        >
          {data.data.choiceA}
        </Option>
        <VS> vs </VS>
        <Option
          active={selectedOption === "B"}
          onClick={() => handleOptionClick("B")}
          className={selectedOption === "B" ? "selected" : ""}
          disabled={isRunning}
        >
          {data.data.choiceB}
        </Option>
      </OptionContainer>
      <ProgressBarWrapper>
        <ProgressBarContainer>
          <ProgressBarFillA filled={filledA} active={selectedOption === "A"} />
          <ProgressBarFillB filled={filledB} active={selectedOption === "B"} />
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
  background-color: ${(props) =>
    props.active ? "#5D47E7" : "#1B1A25"}; // A 옵션의 게이지 색상
  transition: width 0.5s;
`;

export const ProgressBarFillB = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${(props) => props.filled}%;
  background-color: ${(props) =>
    props.active ? "#5D47E7" : "#1B1A25"}; // B 옵션의 게이지 색상
  transition: width 0.5s;
`;

const ProgressBarText = styled.span`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

export default GameChoicePercent;
