import styled from "styled-components";

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