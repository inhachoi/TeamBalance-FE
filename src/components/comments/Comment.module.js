import styled from 'styled-components'


export const StCommentsSection = styled.div`
display: flex;
gap: 20px;
    background: #1b1a25;
 padding-left: 30px;
 padding-right: 30px;
    height: auto ;
    border-radius: 4px;
    margin: 30px;
    align-items: flex-start;
    align-content: center;
    justify-content: flex-start;
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
    justify-content: flex-start;
    background: white;
    padding: 5px;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 4px;
    gap: 10px;


    
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

export const StTogglebutton = styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: center;

`