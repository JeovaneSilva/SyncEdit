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

    @media (max-width:500px){

        > div:first-child{
            margin-left: 10px;
            margin-bottom: 50px;
            flex-direction: column;
            align-items: start;
            justify-content: center;
        }

        > div:first-child > label{
            font-size: 13px;
        }

        > div:first-child > div{
            display: flex;
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
            margin-bottom: 50px;
            display: flex;
            gap: 1rem;
            margin-right: 10px;
        }

        > div:last-child > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        > div:last-child button{
            padding: 5px;
            height: 40px;
            font-size: 15px;
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