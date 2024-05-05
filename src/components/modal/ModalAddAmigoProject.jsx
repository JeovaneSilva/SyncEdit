import React from 'react'
import { Modal,ModalButton,ModalContentAddAmigo } from './stylesModais'
import { FaPlus} from "react-icons/fa";
import { db } from '../../firebase/firebaseConfig'

const ModalAddAmigoProject = ({nomesAmigos,uid,nomeProjeto,setmodalAddAmigoProject}) => {

  const NovoColaborador = async (nome) => {
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
      const projetoKey = Object.keys(snapshot.val())[0];
  
      // Recuperar a lista atual de colaboradores do projeto
      const colaboradoresAtuais = snapshot.val()[projetoKey].colaboradores || {};
      
      // Adicionar o novo colaborador à lista
      colaboradoresAtuais[nome] = true;
  
      // Atualizar a lista de colaboradores no banco de dados
      await db.ref(`users/${uid}/documentos/${projetoKey}`).update({
        colaboradores: colaboradoresAtuais
      });
      
    } catch (error) {
      console.error("Erro ao adicionar novo colaborador:", error);
    }
  }

  return (
    <Modal>
          <ModalContentAddAmigo>
          {nomesAmigos.map((nome, index) => (
                        <div key={index}>
                            <p>{nome}</p>
                            <FaPlus onClick={() => NovoColaborador(nome)}/>
                        </div>
                      ))}
                      <ModalButton onClick={() => setmodalAddAmigoProject(false)}>Sair</ModalButton>
          </ModalContentAddAmigo>
    </Modal>
  )
}

export default ModalAddAmigoProject