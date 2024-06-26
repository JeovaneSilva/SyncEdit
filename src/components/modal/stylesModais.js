import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #00000086;
  justify-content: center;
  align-items: center;
  z-index: 999;

`;

export const ModalEditorDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #00ff9c;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  
  > div:first-child{
    width: 100vw;
  }
  > div:first-child > div:first-child{
    height: 100%
  }

`;

export const ModalButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #038a57;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover{
    background-color: #035234;
  }
`;

export const FooterEditor = styled.div`
    display: flex;
    width: 100vw;
    height: 25vh;
    justify-content: space-between;
    align-items: center;

    > div:first-child{
        margin-left: 2rem;
        display: flex;
        align-items: center;
    }

    > div:first-child > label{
        font-size: 20px;
    }

    > div:first-child > div{
        display: flex;
        align-items: center;
        gap: 30px;
    }

    > div:first-child > div > input{
        margin: 0 10px;
       height: 35px;
       width: 200px;
       padding: 8px;
    }

    > div:first-child > div > svg{
        width: 35px;
        color: #038a57;
        height: 35px;
        cursor: pointer;
    }

    > div:last-child{
        display: flex;
        gap: 3rem;
        margin-right: 2rem;
    }

    > div:last-child > div {
        display: flex;
        gap: 3rem;
    }

    > div:last-child button{
        width: 150px;
        cursor: pointer;
        padding: 8px;
        height: 45px;
        font-size: 20px;
        border-radius: 8px;
        background-color: #038a57;
        color: white;
        border: 1px solid black;
    }

    @media (max-width:1300px){
        
        > div:first-child{
            margin-left: 10px;
            margin-bottom: 50px;
            align-items: center;
        }

        > div:last-child{
            margin-bottom: 50px;
            display: flex;
            gap: 8rem;
            margin-right: 10px;
        }

        > div:last-child > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }

    @media (max-width:940px){
        > div:first-child{
            margin-left: 10px;
            margin-bottom: 50px;
            flex-direction: column;
            align-items: start;
            justify-content: center;
        }

        > div:first-child > label{
            font-size: 18px;
            margin-left: 12px;
        }

        > div:first-child > div{
            gap: 10px;
        }

        > div:last-child{
            margin-bottom: 50px;
            display: flex;
            gap: 2rem;
            margin-right: 10px;
        }

    }

    @media (max-width:680px){

        > div:first-child > label{
            font-size: 13px;
            margin-left: 0;
        }

        > div:first-child > div > input{
            margin: 0 10px 0 0;
            height: 25px;
            width: 100px;
            padding: 8px;
        }

        > div:first-child > div > svg{
            width: 25px;
            height: 25px;
        }

        > div:last-child{
            gap: 1rem;
        }

        > div:last-child button{
            padding: 5px;
            height: 40px;
            font-size: 10px;
            font-weight: bolder;
            width: 80px;
        }

    } 
`

export const ModalContentDocumentoDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    input{
        margin-top: 15px;
        width: 200px;
        height: 30px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 5px;
    }

    div{
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 20px;
        
    }

    p{
        font-weight: bold;
    }
`;

export const ModalContentAddAmigo = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;

   >  div{
        border-radius: 5px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

   >  div:hover{
        background-color: #038a57;
    }

    p{
        font-size: 20px;
    }
`

export const ModalContentExcluir = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;

    div{
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 20px;
        
    }

    p{
        font-weight: bold;
    }
`;

export const ContentSugestao = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 400px;
    background-color: white;
    padding: 10px;

    textarea{
        max-height: 300px;
        max-width: 100%;
        height: 300px;
        width: 100%;
        padding: 10px;
    }

    > div {
        display: flex;
        gap: 20px;
    }

    button{
        width: 100px;
    }
`

export const DivColaboracoes = styled.div`
    background-color: white;
    width: 500px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    > div > div {
        width: 100%;
    }

    > div > div > button{
        text-align: left;
        padding: 5px;
        font-size: 20px;
        width: 480px;
        height: 45px;
        border: none;
        background-color: #038a57;
        border-radius: 10px;
        margin-top: 5px;
        color: white;
    }

    > div > div > button:hover{
        background-color: #035234;
    }

    button{
        width: 150px;
        margin-top: 20px;
    }

    @media (max-width:550px){
        width: 250px;

        > div > div > button{
        padding-left: 10px;
        font-size: 15px;
        width: 220px;
        height: 35px;
        border: none;
        margin-top: 2px;
    }

        button{
            width: 90px;
            height: 35px;
        }   
    }
`

export const ContentComentários = styled.div`
    width: 95%;
    height: 90%;
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div:first-child{
        height: 85%;
        width: auto;
    }

    div:first-child > div{
        margin-top: 20px;
        width: max-content;
        height: max-content;
        display: flex;
        align-items: start;
        justify-content: center;
        gap: 10px;
    }

    div:first-child > div> p{
        max-width: 900px;
        background-color: #038a57;
        border-radius: 0 20px 20px 20px;
        padding: 10px;
        font-size: 20px;
        color: white;
    }

    div:first-child > div> svg:first-child{
        width: 30px;
        height: 30px;
    }

    div:first-child > div> svg:last-child{
        margin-top: 10px;
        width: 25px;
        height: 25px;
    }

    div:last-child{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    div:last-child button{
        width: 150px;
        height: 45px;
        font-size: 20px;
    }

    @media (max-width:1115px){
        
        div:first-child > div> p{
            max-width: 600px;
            font-size: 17px;
        }
    }

    @media (max-width:830px){

        div:first-child > div> p{
            max-width: 400px;
            font-size: 17px;
        }
    }

    @media (max-width:600px){

        div:first-child > div> p{
            max-width: 200px;
            font-size: 13px;
        }

        div:first-child > div> svg:first-child{
        width: 20px;
        height: 20px;
    }

    div:first-child > div> svg:last-child{
        margin-top: 10px;
        width: 15px;
        height: 15px;
    }

    div:last-child button{
        width: 100px;
        height: 35px;
        font-size: 12px;
    }
    }
    

`