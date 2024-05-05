import React, {useRef,useMemo} from 'react'
import {FaEdit} from "react-icons/fa";
import JoditEditor from 'jodit-react';
import { ModalEditorDiv,FooterEditor } from './stylesModais'
import { CarregarProjetosColaborador } from '../../firebase/firebaseFunctions';
import { db } from '../../firebase/firebaseConfig';

const ModalEditorColab = ({content,nomeProjeto,setModalEditorColaborador,uid,userName,setProjetosColaborador}) => {

    const editor = useRef(null)
    const ButonSalvar = useRef(null)

    const config = useMemo(() => ({
        height: "75vh"
      }), []); // A configuração só será recriada se as dependências mudarem

      const SalvarContentColab = async () => {
        try {
          const snapshot = await db.ref(`users`).once('value');
          const usersData = snapshot.val();
      
          if (usersData) {
            Object.values(usersData).forEach(async (user) => {
              if (user.documentos) {
                Object.entries(user.documentos).forEach(async ([key, projeto]) => {
                  // Verifica se o documento corresponde ao projeto original com o mesmo nome do projeto atual
                  if (projeto.nameProject === nomeProjeto && !projeto.colaborador) {
                    // Atualiza o texto do projeto original com o conteúdo digitado pelo colaborador
                    await db.ref(`users/${user.id}/documentos/${key}`).update({
                      text: editor.current.value
                    })
                  }
                  
                });
              }
            });
          }
          alert("salvo")
        } catch (error) {
          console.error("Erro ao salvar o texto do projeto colaborador:", error);
        }
      }

      const closeEditorColaborador = async () => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
      
        try {
          const snapshot = await db.ref(`users`).once('value');
          const usersData = snapshot.val();
      
          if (usersData) {
            Object.values(usersData).forEach(async (user) => {
              if (user.documentos) {
                Object.entries(user.documentos).forEach(async ([key, projeto]) => {
                  // Verifica se o documento corresponde ao projeto original com o mesmo nome do projeto atual
                  if (projeto.nameProject === nomeProjeto && !projeto.colaborador) {
                    // Atualiza o texto do projeto original com o conteúdo digitado pelo colaborador
                    await db.ref(`users/${user.id}/documentos/${key}`).update({
                      ultimoAcesso: dataFormatada
                    })
                  }
                  
                });
              }
            });
          }
        } catch (error) {
          console.error("Erro ao salvar o texto do projeto colaborador:", error);
        }
      
          setModalEditorColaborador(false);
          CarregarProjetosColaborador(uid, userName, setProjetosColaborador);
      };

  return (
    <ModalEditorDiv>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
        />
        <FooterEditor>
            <div>
              <label>Editar Nome:</label>
              <div>
                <input type="text" />
                <FaEdit/>
              </div>
            </div>

          <div>
            <div>
              <button ref={ButonSalvar} onClick={SalvarContentColab}>Salvar</button>
              <button onClick={closeEditorColaborador}>Fechar</button>
            </div>

            <div>
              <button>Baixar</button>
              <button>Membros</button>
            </div>
          </div>
        </FooterEditor>
          
      </ModalEditorDiv>
  )
}

export default ModalEditorColab