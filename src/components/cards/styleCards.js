import styled from "styled-components";

export const CardsProjetos = styled.div`
    width: 80vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 380px));
    place-items: center;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width:1130px){
        grid-template-columns: repeat(3, minmax(140px, 380px));
    }

    @media (max-width:894px){
        grid-template-columns: repeat(2, minmax(140px, 380px));
    }

    @media (max-width:550px){
        grid-template-columns: repeat(1, minmax(140px, 380px));
    }

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

    @media (max-width:500px){
        width: 210px;
    }
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

    p{
        font-size: 30px;
        font-weight: bolder;
        color: #038a57;
    }

    @media (max-width:500px){
        display: none;
    }
`
export const MobileAdd = styled.div`
    position: fixed;
    display: none;
    align-items: center;
    bottom: 0;
    justify-content: center;
    width: 100vw;
    height: 45px;
    background-color: #00ff9c;

    div{
        position: fixed;
        margin-bottom: 40px;
        width: 70px;
        height: 70px;
        background-color: #08c57c;
        padding: 10px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg{
        width: 75%;
        height: 75%;
        color: white;
        cursor: pointer;
    }

    @media (max-width:500px){
        display: flex;
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
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 65px;
        height: 32px;
        border-radius: 25px;
        background-color: #00ff9c;
    }

    div:first-child > svg, div:last-child > svg{
        font-size: 18px;
        width: 100%;
        height: 70%;
    }

    div:last-child{
        cursor: pointer;
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