import { tmiGames, deleteGame } from "../../axios/tmiGames";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import {
  StTmiBox,
  StTmi,
  StDeleteButton,
  StMainBox,
  StTodayTmiBox,
  StTodayTmiChoiceA,
  StTodayTmiChoiceB,
  StVs,
} from "../../pages/Main.module";

const GameListBox = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["games"],
    queryFn: tmiGames,
  });

  // 게임 삭제
  const deleteTmiMutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: async (data) => {
      console.log("삭제 성공 : ", data);
      await refetch();
    },
    onError: (error) => {
      console.log("삭제 실패 : ", error);
    },
  });

  // 삭제 버튼 함수
  const handleDeleteGame = async (itemId) => {
    console.log("작은 버튼 눌림");
    deleteTmiMutation.mutate(itemId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  const randomIndex = Math.floor(Math.random() * data.data.length);

  const handleGameClick = (itemId) => {
    navigate(`/detail/${itemId}`);
  };

  return (
    <>
      <StMainBox>
        {/* 가운데 부분 */}
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;🎉 추천 TMI 밸런스 게임 🎉</h2>
        <NavLink to={`/detail/${data.data[randomIndex]}`}>
          <StTodayTmiBox>
            <h2>{data.data[randomIndex].gameTitle}</h2>
            <div>
              <StTodayTmiChoiceA>
                {data.data[randomIndex].choiceA}
              </StTodayTmiChoiceA>
              <StVs>VS</StVs>
              <StTodayTmiChoiceB>
                {data.data[randomIndex].choiceB}
              </StTodayTmiChoiceB>
            </div>
          </StTodayTmiBox>
        </NavLink>
      </StMainBox>

      <StTmiBox>
        <h2>&nbsp;&nbsp;모든 TMI 밸런스 게임 🔥</h2>
        <div>
          {data.data.length > 0 ? (
            data.data.map((item) => (
              <StTmi key={item.id} onClick={() => handleGameClick(item.id)}>
                {item.gameTitle}
                <StDeleteButton
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 중단합니다.
                    handleDeleteGame(item.id);
                  }}
                >
                  X
                </StDeleteButton>
              </StTmi>
            ))
          ) : (
            <StTmi>No Data</StTmi>
          )}
        </div>
      </StTmiBox>
    </>
  );
};

export default GameListBox;
