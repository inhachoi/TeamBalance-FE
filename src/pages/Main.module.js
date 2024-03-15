import styled from "styled-components";

// 본문 css
export const StMainBox = styled.div`
  background-color: #d9d9d9;
  padding: 10px;
`;
export const StTodayTmiBox = styled.div`
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
export const StTodayTmiChoiceA = styled.button`
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
export const StTodayTmiChoiceB = styled.button`
  width: 400px;
  height: 200px;
  margin: 40px 0px 30px 30px;
  border: none;
  background-color: #5d47e7;
  border-radius: 20px;
  font-size: 25px;
  cursor: pointer;
`;
export const StVs = styled.span`
  font-size: 30px;
  font-weight: bold;
`;
export const StTmiBox = styled.div`
  min-height: 350px;
  padding: 20px 50px 50px 50px;
  color: white;
  background-color: black;
`;
export const StTmi = styled.button`
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
export const StAddModalOpenButton = styled.button`
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
export const StModalOverlay = styled.div`
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
export const StModalForm = styled.form`
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
export const StModalCloseButton = styled.button`
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
export const StModalInput = styled.input`
  width: 250px;
  height: 30px;
  margin: 15px;
  border: none;
  border-radius: 10px;
`;
export const StTmiAddButton = styled.button`
  width: 150px;
  height: 40px;
  margin-top: 20px;
  color: white;
  background-color: #5d47e7;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
