import styled from 'styled-components'

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
        border: 1px solid var(--cor1);
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
        font-family: var(--font1);
        font-size: 16px;
        width: 350px;
        height: 30px;
        border-radius: 5px;
        border: none;
        padding: 10px;
        border: 2px solid var(--cor2);
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