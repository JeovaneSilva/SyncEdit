import styled from "styled-components";

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

    @media (max-width:500px){
        height: 80px;
    }
`

export const Logo = styled.div`
    margin-left: 53px;

    img{
        width: 70px;
        height: 70px;
    }

    @media (max-width:500px){
        margin-left: 10px;

        img{
            width: 50px;
            height: 50px;
        }   
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

    input{
        width: 100%;
        height: 45px;
        padding: 5px;
        background-color: transparent;
        border: none;
        font-size: 18px;
        outline: none;
    }

    @media (max-width:500px){
        margin-right: 20px;
        width: 200px;
        height: 40px;
    }

`
export const MenuToggle = styled.div`
    margin-right: 36px;
    
    svg{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    @media (max-width:500px){
        margin-right: 10px;

        svg{
            width: 20px;
            height: 20px;
        }
    }
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