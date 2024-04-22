import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Textos = () => {
    const {id} = useParams();

    const navigate = useNavigate()

    const DownloadText = () => {
        console.log("texto baixado")
        return navigate("/")
    }
    
  return (
    <div>
        <h1>Exibindo o texto do id: {id}</h1>

        <button onClick={DownloadText}>Baixar Texto</button>
    </div>
  )
}

export default Textos