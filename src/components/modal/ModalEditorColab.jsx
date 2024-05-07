import React, {useState,useRef,useMemo, useEffect} from 'react'
import {FaEdit, FaSyncAlt} from "react-icons/fa";
// import JoditEditor from 'jodit-react';
import { ModalEditorDiv,FooterEditor, Modal, ContentSugestao, ModalButton } from './stylesModais'
import { CarregarProjetosColaborador } from '../../firebase/firebaseFunctions';
import { db } from '../../firebase/firebaseConfig';
import html2pdf from 'html2pdf.js';
import ModalMostrarMenbros from './ModalMostrarMenbros';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalEditorColab = ({setContent,content,nomeProjeto,setModalEditorColaborador,uid,userName,setProjetosColaborador}) => {

  const [nomeEditado, setNomeEditado] = useState('');
  const [modalMenbros, setModalMenbros] = useState(false)
  const [modalSugestões, setmodalSugestões] = useState(false)
  const [contribuição, setContribuição] = useState('');

  const closeEditorColaborador = async () => {
      setModalEditorColaborador(false);
      CarregarProjetosColaborador(uid, userName, setProjetosColaborador);
  };

  const handleDownloadPDF = () => {
    const contentHtml = content; 

    const opt = {
      margin: 1,
      filename: `${nomeProjeto}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(contentHtml).save();
  };

  const handleNomeChange = (event) => {
    setNomeEditado(event.target.value);
  };

  const MudarNomeProjeto = async () => {
    try {
      const snapshot = await db.ref(`users`).once('value');
      const usersData = snapshot.val();
  
      if (usersData) {
        Object.values(usersData).forEach(async (user) => {
          if (user.documentos) {
            Object.entries(user.documentos).forEach(async ([key, projeto]) => {
              if (projeto.nameProject === nomeProjeto && !projeto.colaborador) {
                await db.ref(`users/${user.id}/documentos/${key}`).update({
                  nameProject: nomeEditado
                })
              }
              
            });
          }
        });
      }
      alert("nome editado")
    } catch (error) {
      console.error("Erro ao salvar o texto do projeto colaborador:", error);
    }
  }

  const MostrarMembros = () => {
    setModalMenbros(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.ref(`users`).once('value');
        const usersData = snapshot.val();

        if (usersData) {
          Object.values(usersData).forEach((user) => {
            if (user.documentos) {
              Object.entries(user.documentos).forEach(([key, doc]) => {
                if (doc.nameProject === nomeProjeto) {
                  setContent(doc.text || '');
                }
              });
            }
          });
        }
      } catch (error) {
        console.error("Erro ao recuperar texto do projeto colaborador:", error);
      }
    };

    fetchData();

    // Adicionar listener de evento para atualizações em tempo real
    const projectRef = db.ref(`users`);
    projectRef.on('value', snapshot => {
      const usersData = snapshot.val();

      if (usersData) {
        Object.values(usersData).forEach((user) => {
          if (user.documentos) {
            Object.entries(user.documentos).forEach(([key, doc]) => {
              if (doc.nameProject === nomeProjeto) {
                setContent(doc.text || '');
              }
            });
          }
        });
      }
    });

    return () => {
      // Limpar o listener quando o componente é desmontado
      projectRef.off('value');
    };
  }, [uid, nomeProjeto]);

  const editorStyle = {
    backgroundColor: 'white',
    height: '75%',
    padding: '10px'
  };

  const ContribuirModal = () => {
    setmodalSugestões(true)
  }
  const FecharContribuirModal = () => {
    setmodalSugestões(false)
  }

  const salvarContribuição = async () => {
    try {
        const snapshot = await db.ref(`users`).once('value');
        const usersData = snapshot.val();

        if (usersData) {
            Object.values(usersData).forEach(async (user) => {
                if (user.documentos) {
                    Object.entries(user.documentos).forEach(async ([key, doc]) => {
                        if (doc.nameProject === nomeProjeto) {
                            // Encontrou o documento correspondente ao projeto atual
                            await db.ref(`users/${user.id}/documentos/${key}/colaborações/${userName}`).push({
                                colaboração: contribuição
                            });
                        }
                    });
                }
            });
        }
        alert("Contribuição salva com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar contribuição:", error);
    }
}


  return (
    <>
    <ModalEditorDiv>
    <div style={editorStyle}>
    <ReactQuill
        value={content}
        modules={{ toolbar: false }}
        readOnly={true}
        theme="snow"
    />
    </div>

        {/* <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={handleContentChange}
        /> */}
        <FooterEditor>
            <div>
              <label>Editar Nome:</label>
              <div>
              <input type="text" onChange={handleNomeChange} placeholder={nomeProjeto} />
              {nomeEditado && <FaEdit onClick={MudarNomeProjeto} />}
              <FaSyncAlt />
              </div>
            </div>

          <div>
            <div>
              <button  onClick={ContribuirModal}>Contribuir</button>
              <button onClick={closeEditorColaborador}>Fechar</button>
            </div>

            <div>
              <button onClick={handleDownloadPDF}>Baixar</button>
              <button onClick={MostrarMembros}>Membros</button>
            </div>
          </div>
        </FooterEditor>
          
      </ModalEditorDiv>

      {modalMenbros &&
        <ModalMostrarMenbros
        uid={uid}
        nomeProjeto={nomeProjeto}
        setModalMenbros={setModalMenbros}
        />
       }

      {modalSugestões &&
        <Modal>
            <ContentSugestao>
            <textarea
                name="sugestao"
                id="sugestao"
                placeholder='Sua contribuição'
                value={contribuição}
                onChange={(e) => setContribuição(e.target.value)}
            />
              <div>
                <ModalButton onClick={salvarContribuição}>Salvar</ModalButton>
                <ModalButton onClick={FecharContribuirModal}>Sair</ModalButton>
              </div>
            </ContentSugestao>
        </Modal>
       }
      </>
  )
}

export default ModalEditorColab