import styled from "styled-components";

export const CardsProjetos = styled.div`
    width: 80vw;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 380px));
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width:500px){
        grid-template-columns: repeat(1, minmax(140px, 380px));
        place-items: center;
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
        font-size: 18px;
        width: 65px;
        height: 32px;
        border-radius: 25px;
        background-color: #00ff9c;
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