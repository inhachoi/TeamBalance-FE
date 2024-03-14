import React, { useState, useEffect } from "react";
import {Container} from "./Game.module"
import {Option} from "./Game.module"
import {VS} from "./Game.module"

const GameChoicePercent = () => {
    const [choice, setChoice] = useState("");

  const handleChoice_A = (option) => {
    setChoice(option);
  };

  const handleChoice_B = (option) => {
    setChoice(option);
  };

  useEffect(() => {
    console.log(choice);
  }, [choice]);

  return (
    <div>
      <div>Balance Game</div>
      <Container>
        <Option onClick={() => handleChoice_A("A")}>짜장</Option>{" "}
        <VS> vs </VS>
        <Option active onClick={() => handleChoice_B("B")}> 짬뽕</Option>
      </Container>
    </div>
  );
}

export default GameChoicePercent;
