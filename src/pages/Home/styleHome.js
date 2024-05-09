import styled from "styled-components";

// #00ff9c

export const HomeDiv = styled.div`
    width: 100vw;
    height: 100vh;
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
        border-radius: 8px;
        z-index: 10;
        display: flex;
        flex-direction: column;
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


    @media (max-width:900px){
        > div:first-child{
        width: 350px;
    }
    }

    @media (max-width:550px){
        margin-top: 55px;

        > div:first-child{
        width: 200px;
        top: 62px;
        }

        > div:first-child > div{
        font-size: 13px;
    }

    > div:first-child > div > button{
        width: 30px;
        height: 20px;
        border-radius: 5px;
    }

    > div:first-child > div > button > svg{
        width: 10px;
        height: 10px;
    }

        h1{
            margin-top: 51px;
            font-size: 25px;
        }
    }
   
`
