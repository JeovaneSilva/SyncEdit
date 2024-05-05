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

    @media (max-width:550px){
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

    @media (max-width:900px){
        margin-right: 60px;
        width: 350px;
    }

    @media (max-width:550px){
        margin-right: 30px;
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

    @media (max-width:550px){
        margin-right: 10px;

        svg{
            width: 20px;
            height: 20px;
        }
    }
`