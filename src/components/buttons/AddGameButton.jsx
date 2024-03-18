import React from "react";
import { StAddModalOpenButton } from "../../pages/Main.module";
import { useState } from "react";
import { Modal } from "../game/gameCreate";

function AddGameButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* 게임 추가 버튼 (화면 밑부분에 고정) */}
      <StAddModalOpenButton onClick={openModal}>
        나만의 밸런스 게임 만들기!!!
      </StAddModalOpenButton>

      {/* 모달 */}
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

export default AddGameButton;
