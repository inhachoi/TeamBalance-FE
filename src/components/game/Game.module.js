
import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 33px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px;
  max-width: 100%; /* 최대 너비 지정 */
  overflow: hidden; /* 오버플로우 제어 */

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin: 20px;
  }
`;

export const Option = styled.div`
  background: ${props => props.active ? '#5D47E7' : '#1B1A25'};
  color: white;
  padding: 100px 170px;
  margin: 10px 0;
  text-align: center;
  border-radius: 33px;
  cursor: pointer;
  flex-shrink: 0;

  @media screen and (max-width: 940px) {
    padding: 100px 100px;
  }
  @media screen and (max-width: 590px) {
    padding: 50px 50px;
  }
`;

export const VS = styled.div`
      border-radius: 4px;
    margin: 22px;
    font-size: 46px;

    @media screen and (max-width: 940px) {
        margin: 10px;
        font-size: 26px;
  }
`;
