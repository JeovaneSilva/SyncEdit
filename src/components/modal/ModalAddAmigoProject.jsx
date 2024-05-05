import React, { useState, useEffect } from 'react'
import { Modal,ModalButton,ModalContentAddAmigo } from './stylesModais'
import { FaPlus} from "react-icons/fa";
import { db } from '../../firebase/firebaseConfig'
import { fetchColaboradores } from '../../firebase/firebaseFunctions';

const ModalAddAmigoProject = ({nomesAmigos,uid,nomeProjeto,setmodalAddAmigoProject}) => {

  const [todosColaboradores, setTodosColaboradores] = useState([])

  useEffect(() => {
    fetchColaboradores(uid,nomeProjeto,setTodosColaboradores);
  }, [nomeProjeto]); 

  const NovoColaborador = async (nome) => {
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
      const projetoKey = Object.keys(snapshot.val())[0];
  
      const colaboradoresAtuais = snapshot.val()[projetoKey].colaboradores || {};
      
      colaboradoresAtuais[nome] = true;
  
      await db.ref(`users/${uid}/documentos/${projetoKey}`).update({
        colaboradores: colaboradoresAtuais
      });
      setTodosColaboradores(colaboradoresAtuais)
      
    } catch (error) {
      console.error("Erro ao adicionar novo colaborador:", error);
    }
  }

  console.log(todosColaboradores)

  const eColaborador = (nome) => {
    return todosColaboradores.hasOwnProperty(nome); // Verifica se o nome está na lista de colaboradores
  };

  return (
    <Modal>
          <ModalContentAddAmigo>
          {nomesAmigos.map((nome, index) => (
                        <div key={index}>
                            <p>{nome}</p>
                            {!eColaborador(nome) && <FaPlus onClick={() => NovoColaborador(nome)} />}
                        </div>
                      ))}
                      <ModalButton onClick={() => setmodalAddAmigoProject(false)}>Sair</ModalButton>
          </ModalContentAddAmigo>
    </Modal>
  )
}

export default ModalAddAmigoProject