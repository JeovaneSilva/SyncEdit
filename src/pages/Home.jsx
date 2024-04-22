import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Pagina de Home</h1>
        <p>
        <Link to="/Home/1">Texto 1</Link>
        </p>
        <p>
        <Link to="/Home/2">Texto 2</Link>
        </p>
        <p>
        <Link to="/Home/3">Texto 3</Link>
        </p>
    </div>
  )
}

export default Home