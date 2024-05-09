import React, {useRef} from 'react'
import { FaPlus} from "react-icons/fa";
import { db } from '../../firebase/firebaseConfig';

const Search = ({nomesUsuarios,userName,search,nomesAmigos,setnomesAmigos,uid}) => {

  const DivResultadoPesquisa = useRef()

const filteredUsuarios = nomesUsuarios
  .filter(nome => nome && nome !== userName) // Verifica se nome não é undefined antes de fazer o filtro
  .filter(nome => nome.toLowerCase().includes(search.toLowerCase()));
  
  if (search !== "" && DivResultadoPesquisa.current) {
    DivResultadoPesquisa.current.style.display = "flex";
  }

  if(search === "" && DivResultadoPesquisa.current){
    DivResultadoPesquisa.current.style.display = "none";
  }

  const addAmigo = async (nomeAmigo) => {
    try {
      await db.ref(`users/${uid}/amigos`).push({
        userName: nomeAmigo,
      });
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
    } finally {
        setnomesAmigos([...nomesAmigos, nomeAmigo])
    }
  }

  const hasResultados = filteredUsuarios.length > 0;

  return (
    <div ref={DivResultadoPesquisa}>
      {hasResultados ? (
        filteredUsuarios.map((nome, index) => (
          <div key={index}>
            <p>{nome}</p>
            {!nomesAmigos.includes(nome) && (
              <button onClick={() => addAmigo(nome)}>
                <FaPlus />
              </button>
            )}
          </div>
        ))
      ) : (
        <div>
          <p>Nenhum usuário encontrado</p>
        </div>
      )
    }
    </div>
  )
}

export default Search