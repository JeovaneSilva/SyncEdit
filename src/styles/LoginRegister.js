import styled from 'styled-components'

export const Main = styled.main`
    background-color: #f5f5f5;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;

    img{
        height: 400px;
    }

    form{
        width: 500px;
        padding: 0 20px;
        border-radius: 10px;
        margin-top: -30px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    @media (max-width:500px){
        img{
            display: none;
        }
    }
 
`

export const TopForm = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-bottom: 10px;

    h1{
        font-size: 35px;
    }

    hr{
        border: 1px solid #00ff9c;
        width: 170px;
        text-align: center;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    p{
        margin: 10px 0 0 0;
        font-size: 25px;
    }
`

export const DadosForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    font-weight: 600;

    input {
        font-size: 16px;
        width: 350px;
        height: 35px;
        border-radius: 5px;
        border: none;
        padding: 10px;
        border: 2px solid black;
    }

    label{
        font-size: 18px;
    }

    div{
        display: none;
        margin-top: 3px;
        background-color: red;
        color: white;
        border-radius: 0 10px 10px 10px;
        padding: 3px;
    }
`

export const MostrarSenha = styled.div`
    margin-top: 5px;
    display: flex;
    font-weight: 400;
`

export const ButtonsForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    button:active {
        opacity: 0.8;
    }

    button[disabled] {
        opacity: 0.8;
    }
`

export const ButtonEntrarRegistrar = styled.button`
    width: 200px;
    height: 35px;
    border-radius: 10px;
    border: none;
    background-color: #00ff9c;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
`

export const EsqueciSenha = styled.div`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    margin-top: 0.5rem;
`

export const CadastrarDiv = styled.div`
    margin-top: 1.5rem;
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;

    button{
        padding: 7px;
        font-size: 15px;
        font-weight: 600;
        background-color: transparent;
        border: 2px solid #00ff9c;
        border-radius: 18px;
        width: ${(props) => (props.$LoginRegister === "buttonCadastrar" ? "auto" : "100px")};
        }
`