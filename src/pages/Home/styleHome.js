import styled from "styled-components";

// #00ff9c

export const HomeDiv = styled.div`
    width: 100vw;
    height: 100vh;
`


export const HeaderContainer = styled.header`
    width: 100vw;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: -4px 4px 8px 0px #00000040;
    position: fixed;
    background-color: white;
    top: 0;
    z-index: 10;
`

export const LoadingBar = styled.div`
        position: fixed;
        display: flex;
        flex-direction: column;
        top: 30px;
        margin-left: 150px;
        gap: 10px;

    p{
        text-align: center;
        font-size: 15px;
    }


    hr{
        width: 300px;
        height: 3px;
        border-radius: 5px;
        background-color: black;
        animation: loading 3s ease-in-out ; /* Animação de carregamento */
        border: none;
    }

    @keyframes loading {
  0% {
    width: 0;
  }
  50% {
    width: 150px;
  }
  100% {
    width: 300px;
  }
}
`

export const Logo = styled.div`
    margin-left: 53px;

    img{
        width: 70px;
        height: 70px;
    }
`

export const DivPesquisa = styled.div`
    margin-right: 57px;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    width: 630px;
    background-color: #00ff9c;
    border-radius: 8px;
    padding: 10px;
    height: 60px;
    gap: 5px;

    input{
        width: 100%;
        height: 45px;
        padding: 5px;
        background-color: transparent;
        border: none;
        font-size: 18px;
        outline: none;
    }

`

export const MenuToggle = styled.div`
    margin-right: 36px;
    
    svg{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`

export const SideBar = styled.div`
    background-color: #08c57c;
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    width: 300px;
    right: ${($sidebar) => $sidebar ? '0' : '-100%'};
    animation: showSideBar .4s;
    z-index: 999;

    > svg{
        position: fixed;
        width: 30px;
        height: 30px;
        margin-top: 32px;
        margin-left: 32px;
        cursor: pointer;
    }

    @keyframes showSideBar {
        from{
            opacity: 0;
            width: 0;
        }
        to{
            opacity: 1;
            width: 300px;
        }
        
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;

    > svg:first-child{
        width: 70px;
        height: 70px;
    }

    h1{
        font-size: 25px;
    }

   button{
    width: 60px;
    height: 30px;
    font-size: 18px;
    font-weight: bold;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 10px;
    margin-top: 10px;
   }
`

export const DivListAmigos = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    > div{
        width: 90%;
        border: 1px solid black;
        border-bottom: none;
    }

    > div > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #038a57;
        height: 50px;
        padding: 5px;
        font-weight: bold;
        text-align: left;
        color: white;
        border-bottom: 1px solid black;
    }
    
    > div > div:hover{
        background-color:  #035234;
    }

    > div > div > div:first-child{
        display: flex;
        align-items: center;
        gap: 5px;
    }

    > div > div > div:last-child{
        margin-right: 10px;
        display: flex;
        align-items: center;
    }


    > div > div > div:last-child > svg{
        width: 20px;
        height: 20px;
    }

   
`

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fundo preto transparente */ /* Garante que o overlay esteja acima de todo o conteúdo */
`

export const Section = styled.section`
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    overflow-y: hidden;

    > div:first-child{
        position: fixed;
        top: 77px;
        width: 630px;
        background-color: #00ff9c;
        padding: 5px;
        border-radius: 8px;
        z-index: 10;
    }

    > div:first-child > div{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 20px;
        border-radius: 8px;
    }

    > div:first-child > div:hover{
        background-color: #047a4c;
    }

    > div:first-child > div > button{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 30px;
        background-color: transparent;
        border: 1px solid black;
        border-radius: 10px;
    }

    > div:first-child > div > button:hover{
        background-color: #00ff9c;
    }

    > div:first-child > div > button > svg{
        width: 15px;
        height: 15px;
    }


    h1{
        margin-top: 71px;
        font-size: 40px;
        text-align: center;
    }
`

export const CardsProjetos = styled.div`
    width: 80vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 380px));
    justify-content: center;
    align-items: center;
    gap: 20px;

`

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 210px;
    height: 230px;
    border-radius: 25px;
    border: 2px solid #00ff9c;
    background-color: #f5f5f5;
    gap: 10px;
    margin-bottom: 2rem;
`
export const CardAdd = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 210px;
    height: 230px;
    border-radius: 25px;
    border: 2px solid #00ff9c;
    background-color: #f5f5f5;
    gap: 10px;
    margin-bottom: 2rem;

    svg{
        width: 60px;
        height: 60px;
        color: #038a57;
        cursor: pointer;
    }
`

export const InfoCard = styled.div`
    border-radius: 25px 25px 0 0 ;
    text-align: center;

    h2{
        margin-top: 10px;
        font-size: 20px;
        font-weight: 600;
    }

    p{
        font-weight: 600;
        margin-top: 10px;
        font-size: 13px;
    }

    h3{
        font-weight: 600;
        margin-top: 20px;
        font-size: 20px;
    }

    span{
        font-weight: bolder;
        font-size: 30px;
        margin-top: 25px;
    }
`

export const IconsCard = styled.div`
    display: flex;
    justify-content: space-around;
    width: 210px;

    div:first-child{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        width: 65px;
        height: 32px;
        border-radius: 25px;
        background-color: #00ff9c;
    }

    div:last-child{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        width: 65px;
        height: 32px;
        border-radius: 25px;
        border: 2px solid #00ff9c;
    }
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
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


    

