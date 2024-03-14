import styled from 'styled-components'


export const StCommentsSection = styled.div`
display: flex;
    background: #1b1a25;
    padding: 47px 38px;
    height: 300px;
    max-height: 264px;
    border-radius: 4px;
    margin: 30px;
    align-items: flex-start;
    align-content: center;
    justify-content: flex-end;
    overflow: hidden;
    flex-direction: column;
`;

export const StItemSection = styled.div`

display: flex;
    margin-bottom: 5px;
    margin-top: 1%;
    flex-direction: column;
    width: 100%;
    align-items: center;

`
export const StComment = styled.div`
display: flex;
justify-content: space-between;
    background: white;
    padding: 5px;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 4px;
    
`;

export const StCommentInput = styled.input`
  width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;

`;


export const StCommentInputForm = styled.form`
  width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;

`;

