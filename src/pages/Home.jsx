import React from 'react'
import LogoProjeto from '../../public/logoSyncEdit.png'
import '../styles/global.css'
import '../styles/home.css'
import { FaSearch, FaBars, FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <header>
        <div className="logo">
          <img src={LogoProjeto} alt="" className='Logo' />
        </div>

        <div className="BarraPesquisa">
          <input type="search" name="BuscarUsers" id="BuscarUsers" placeholder='Buscar Usuários' />
          <div className="IconLupa">
            <FaSearch />
          </div>
        </div>

        <div className="Menu">
          <FaBars />
        </div>
      </header>

     
    <section>
        <h1>Documentos de Texto</h1>
        <div className="cardsProjects">

            <div className="card">

              <div className="infocard">
                <h2>Teste</h2>
                <p>Ultimo Acesso: 30/01/2024 </p>
                <h3>Colaboradores</h3>
                <span>0</span>
              </div>

              <div className='IconsCard'>
                <div className="editarIcon">
                  <FaEdit />
                </div>
                <div className="deletarIcon">
                <FaTrash />
                </div>
              </div>

            </div>

        </div>     
    </section>
    </>
  )
}

export default Home