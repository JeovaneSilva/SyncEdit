import React from 'react'
import { FaPlus} from "react-icons/fa";
import { db } from '../../firebase/firebaseConfig';

const Search = ({nomesUsuarios,userName,search,nomesAmigos,setLoading,uid,setTextLoading,setnomesAmigos}) => {

const filteredUsuarios = nomesUsuarios
  .filter(nome => nome && nome !== userName) // Verifica se nome não é undefined antes de fazer o filtro
  .filter(nome => nome.toLowerCase().includes(search.toLowerCase()));

  const addAmigo = async (nomeAmigo) => {
    try {
      setLoading(true);
      await db.ref(`users/${uid}/amigos`).push({
        userName: nomeAmigo,
      });
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
    } finally {
      setTimeout(() => {
        setTextLoading("Amigo adicionado com sucesso!");
        setnomesAmigos([...nomesAmigos, nomeAmigo])
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      }, 2000); // Mudado de 3000 para 7000 para incluir os 2 segundos adicionais
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