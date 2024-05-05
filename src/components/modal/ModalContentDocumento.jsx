import React from 'react'
import { auth,db } from '../../firebase/firebaseConfig'
import { CarregarProjetosProprios } from '../../firebase/firebaseFunctions'
import { Modal,ModalContentDocumentoDiv,ModalButton } from './stylesModais'

const ModalContentDocumento = ({setnomeProjeto,nomeProjeto,uid,setnewProjeto,setModalCriarDocOpen}) => {

    const ConfirmNovoDoc = async () => {
        try {
          // Obtém o UID do usuário criador
          const userId = auth.currentUser.uid;
      
          // Adiciona o novo documento com o UID do usuário criador
          await db.ref(`users/${userId}/documentos`).push({
            nameProject: nomeProjeto,
            ultimoAcesso: "Novo",
            colaboradores: 0,
            text: "",
            criadorUID: userId // Adiciona o UID do usuário criador
          });
            
          // Atualiza a lista de projetos
          CarregarProjetosProprios(uid, setnewProjeto);
          // Fecha o modal após adicionar o novo documento
          closeModalNovoDoc();
        } catch (error) {
          console.error("Erro ao adicionar projeto:", error);
        }
      }

      const closeModalNovoDoc = () => {
        setModalCriarDocOpen(false);
      }

  return (
    <Modal>
          <ModalContentDocumentoDiv>
            <p>Insira o nome do documento</p>
            <input type="text" onChange={(e) => setnomeProjeto(e.target.value)}/>
            <div>
              <ModalButton onClick={ConfirmNovoDoc}>Confirmar</ModalButton>
              <ModalButton onClick={closeModalNovoDoc}>Cancelar</ModalButton>
            </div>
          </ModalContentDocumentoDiv>
    </Modal>
  )
}

export default ModalContentDocumento