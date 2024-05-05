import React from 'react'
import { Modal,ModalContentExcluir,ModalButton } from './stylesModais'
import { CarregarProjetosProprios } from '../../firebase/firebaseFunctions'
import { db } from '../../firebase/firebaseConfig'

const ModalExcluirProjeto = ({projetoExcluir,setModalExcluirProjetoOpen,uid,setnewProjeto,newProjeto}) => {

    const closeModalExcluirProjeto = () => {
        setModalExcluirProjetoOpen(false);
      }

      const deletarProjeto = async (nomeProjeto) => {
        try {
          const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
          const projetoKey = Object.keys(snapshot.val())[0];
    
          await db.ref(`users/${uid}/documentos/${projetoKey}`).remove();
          CarregarProjetosProprios(uid, setnewProjeto);
        } catch (error) {
          console.error("Erro ao deletar amigo:", error);
        }
      }
    
      const confirmarDeletarProjeto = () => {
        setnewProjeto(newProjeto.filter(nomeProjeto => nomeProjeto !== projetoExcluir))
        deletarProjeto(projetoExcluir);
        closeModalExcluirProjeto();
      }

  return (
    <Modal>
          <ModalContentExcluir>
            <p>Deseja realmente excluir {projetoExcluir}?</p>
            <div>
              <ModalButton onClick={confirmarDeletarProjeto}>Confirmar</ModalButton>
              <ModalButton onClick={closeModalExcluirProjeto}>Cancelar</ModalButton>
            </div>
          </ModalContentExcluir>
        </Modal>
  )
}

export default ModalExcluirProjeto