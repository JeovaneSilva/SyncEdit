import styled from "styled-components";

export const MainError = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-direction: column;

    img{
        width: 600px;
        height: 500px;
    }

    p{
        font-size: 20px;
    }

    a{
        font-size: 20px;
        text-decoration: none;
    }

    
    @media (max-width:640px){
        p{
            font-size: 12px;
        }

        a{
            font-size: 12px;
        }
    }

    @media (max-width:500px){
       img{
            width: 400px;
            height: 300px;
       }

       p{
        max-width: 300px;
        text-align: center;
        margin-bottom: 20px;
       }
    }
`;