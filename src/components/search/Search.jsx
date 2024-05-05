import React from 'react'
import { FaPlus} from "react-icons/fa";
import { db } from '../../firebase/firebaseConfig';

const Search = ({nomesUsuarios,userName,search,nomesAmigos,setnomesAmigos,uid}) => {

const filteredUsuarios = nomesUsuarios
  .filter(nome => nome && nome !== userName) // Verifica se nome não é undefined antes de fazer o filtro
  .filter(nome => nome.toLowerCase().includes(search.toLowerCase()));

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

  return (
    <div>
          {filteredUsuarios.map((nome, index) => (
            <div key={index}>
              <p>{nome}</p>
              {!nomesAmigos.includes(nome) && (
                <button onClick={() => addAmigo(nome)}>
                  <FaPlus />
                </button>
              )}
            </div>
          ))}
    </div>
  )
}

export default Search