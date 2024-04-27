import styled from "styled-components";

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
`

export const DivLoading = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;

    label {
        font-size: 24px;
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
    overflow-y: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 630px;
    background-color: #00ff9c;
    border-radius: 8px;
    padding: 10px;
    height: 60px;
    gap: 5px;

    input{
        width: 550px;
        height: 45px;
        padding: 5px;
        background-color: transparent;
        border: none;
        font-size: 18px;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        width: 70px;
        height: 45px;
        border-radius: 8px;
    }

    div > svg{
        font-size: 26px;
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

    > svg{
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

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    overflow-y: hidden;


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
