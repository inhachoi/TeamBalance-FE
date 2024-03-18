import React, { useState, useEffect } from "react";
import { Container, OptionContainer } from "./Game.module";
import { Option } from "./Game.module";
import { VS } from "./Game.module";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

const GameChoicePercent = ({ data }) => {//이거여
  console.log(data.data)
  const [selectedOption, setSelectedOption] = useState(""); 
  const [isRunning, setIsRunning] = useState(false); 
  const [filledA, setFilledA] = useState(0); 
  const [filledB, setFilledB] = useState(0); 

  /**
   * 1. 전달해준 데이터가 어떻게 넘어오는 타입인지 확인 => data만 인건지 아니면 그 안에 다른 객체로 또 쌓여있는지
   * 2. 그 객체 안에서 데이터를 구조분해할당으로 해야하는 것 같은데 1번 해결되면 2번이 아래 작성해주신 코드입니다.
   * 3. data 객체가 무조건 한개의 객체라고 생각하지말고 내가 필요한 데이터가 어디 안에 더 들어가있는지도 확인이 되어야 합니다.
   * 
   * 이해 했죠???
   * 엡!
   * 
   * 그럼 liveshare 끝낼게여
   * 믿고 기다려봅니다
   * 경일님 6시까지 식사 편하게 하고 오세여
   * 
   * 혜인님
   * 프롭으로 전달받은게뭐에요?
   * 여기다 답하기
   * 리스폰스에 데이터가
   * 왜 또 불러져요
   * 프롭으로
   * 받은 
   * 애가
   * 누구져?
   * g
   * 혜인님
   * 우리
   * 리액트할때
   * 컴포넌트 프롭 어떻게 받아여
   * 위에 8번줄
   * 네
   * 거기서 뭘로 받아여
   * data로 받아오죠?
   * 근데 제가 위에 뭐라고 했어영??
   * 전달해준 데이터가 어떻게 넘어오는 타입인지 확인 => data만 인건지 아니면 그 안에 다른 객체로 또 쌓여있는지 
   *  => data 값이 아까 콘솔에 {}엿쬬넹
   * data.data?
   * 그럼 그 안에 뭐가 잇었어요
   * 네 맞아여
   * data로 받아온 애가
   * 객체안에 또다른 data로 오니까
   * data.data에요
   * 맘대러대는게한개도없네
   */


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
      <div>{data.data.gameTitle}</div>
      <OptionContainer>
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
          {data?.choiceB}
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
