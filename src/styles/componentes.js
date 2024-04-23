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

export const Formulario = styled.div`
    div{
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        font-weight: 600
    }
`