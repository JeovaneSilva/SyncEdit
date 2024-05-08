import React, {useState,useRef,useMemo, useEffect} from 'react'
import {FaEdit, FaSyncAlt } from "react-icons/fa";
// import JoditEditor from 'jodit-react';
import { db } from '../../firebase/firebaseConfig';
import ModalAddAmigoProject from './ModalAddAmigoProject';
import { ModalEditorDiv,FooterEditor, Modal, DivColaboracoes,ModalButton,ContentComentários } from './stylesModais'
import { CarregarProjetosProprios} from '../../firebase/firebaseFunctions';
import html2pdf from 'html2pdf.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalEditor = ({setContent,content,uid,nomeProjeto,setModalEditor,setnewProjeto,nomesAmigos}) => {


    const [modalAddAmigoProject, setmodalAddAmigoProject] = useState(false);
    const [nomeEditado, setNomeEditado] = useState('');
    const [colaboracoes, setColaboracoes] = useState([]);
    const [modalColaboracoes, setModalColaboracoes] = useState(false);
    const [ContribuicoesContribuidores, setContribuicoesContribuidores] = useState(false);
    const [msgContribuicoes, setMsgContribuicoes] = useState([])

    // const config = useMemo(() => ({
    //     height: "75vh",
    //     placeholder: '',
    //     autofocus: false,
		//     cursorAfterAutofocus: 'start' | 'end',
    //     readonly: false,
    //     saveSelectionOnBlur: true,
    //   }), []); // A configuração só será recriada se as dependências mudarem

    const handleContentChange = async (newContent) => {
    setContent(newContent);
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
      snapshot.forEach((projetoSnapshot) => {
        projetoSnapshot.ref.update({
          text: newContent,
        });
      });
    } catch (error) {
      console.error("Erro ao salvar o texto do projeto:", error);
    }
  };

    const closeEditor = async () => {

      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const dataFormatada = `${ano}-${mes}-${dia}`;
    
      try {
        const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
        snapshot.forEach((projetoSnapshot) => {
      
          // Atualiza o último acesso do projeto
          projetoSnapshot.ref.update({
            ultimoAcesso: dataFormatada
          });
          
        });
        
      } catch (error) {
        console.error("Erro ao salvar o texto do projeto:", error);
      }
          setModalEditor(false);
          CarregarProjetosProprios(uid, setnewProjeto);
      }

      const handleDownloadPDF = () => {
        const contentHtml = content
    
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
          const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
          snapshot.forEach((projetoSnapshot) => {
            projetoSnapshot.ref.update({
              nameProject: nomeEditado,
            });
            
          });
          alert("nome modificado")
          
        } catch (error) {
          console.error("Erro ao salvar o texto do projeto:", error);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          try {
            const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
            const projetoKey = Object.keys(snapshot.val())[0];
            const textoProjeto = snapshot.val()[projetoKey].text;
            setContent(textoProjeto);
          } catch (error) {
            console.error("Erro ao recuperar texto do projeto:", error);
          }
        };
    
        fetchData();
        
        const projectRef = db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto);
        projectRef.on('value', snapshot => {
          const projetoKey = Object.keys(snapshot.val())[0];
          const textoProjeto = snapshot.val()[projetoKey].text;
          setContent(textoProjeto);
        });
    
        return () => {
          projectRef.off('value');
        };
      }, [uid, nomeProjeto]);

      const modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'size': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
           { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image', 'video'],
          ['align', 'color', 'background'], // Adicionando alinhamento, cor do texto e cor de fundo
          ['script', 'formula'], // Adicionando script e fórmula
          ['code-block'], // Adicionando bloco de código
          ['clean']
        ]
      };
    
      const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background',
        'script', 'formula',
        'code-block'
      ];
    
      const editorStyle = {
        backgroundColor: 'white',
        height: '75vh',
        padding: '10px'
      };

      const OpenModalColaboracoes = async () => {
        try {
            const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
            const projetoKey = Object.keys(snapshot.val())[0];
            const colaboracoesData = snapshot.val()[projetoKey].colaborações || {};
    
            if (colaboracoesData) {
                const colaboradoresArray = Object.keys(colaboracoesData);
                setColaboracoes(colaboradoresArray);
                
            } else {
                setColaboracoes([]);
            }
            
            setModalColaboracoes(true);
        } catch (error) {
            console.error("Erro ao buscar as colaborações:", error);
        }
    }
    

      const FecharContribuicoesModal = () => {
        setModalColaboracoes(false)
      }

      const handleMostrarColaboracao = async (colaborador) => {
        setContribuicoesContribuidores(true)
        try {
            const snapshot = await db.ref(`users`).once('value');
            const usersData = snapshot.val();
    
            if (usersData) {
                Object.values(usersData).forEach(async (user) => {
                    if (user.id === uid && user.documentos) {
                        Object.entries(user.documentos).forEach(async ([key, doc]) => {
                            if (doc.nameProject === nomeProjeto && doc.colaborações) {
                                const colaboracoesSnapshot = await db.ref(`users/${uid}/documentos/${key}/colaborações/${colaborador}`).once('value');
                                const colaboracoes = colaboracoesSnapshot.val();
                                
                                if (colaboracoes) {
                                    const colaboracoesArray = Object.entries(colaboracoes).map(([id, colaboracao]) => ({
                                        id: id,
                                        colaboracao: colaboracao.colaboração
                                    }));
                                    setMsgContribuicoes(colaboracoesArray)
                                   
                                } else {
                                    alert(`${colaborador} não tem colaborações neste projeto.`);
                                }
                                
                            }
                        });
                    }
                });
            }
        } catch (error) {
            console.error("Erro ao buscar a colaboração:", error);
        }
    }

    const FecharMsgContribuicoes=() => {
      setContribuicoesContribuidores(false)
    }

    console.log(msgContribuicoes)
    
  return (
    <>
    <ModalEditorDiv>
    <div style={editorStyle}>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
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
                <button onClick={OpenModalColaboracoes}>Contribuições</button>
                <button onClick={closeEditor}>Fechar</button>
              </div> 

              <div>
                <button onClick={handleDownloadPDF}>Baixar</button>
                <button onClick={() => setmodalAddAmigoProject(true)}>Convidar</button>
              </div>

            </div>
          </FooterEditor>  
        </ModalEditorDiv>

        {modalAddAmigoProject && 
            <ModalAddAmigoProject 
            nomesAmigos={nomesAmigos}
            uid={uid}
            nomeProjeto={nomeProjeto}
            setmodalAddAmigoProject={setmodalAddAmigoProject}
            />
        }

        {modalColaboracoes && 
            <Modal>
              <DivColaboracoes>
              <div>
                {colaboracoes.map((colaborador, index) => (
                    <div key={index}>
                        <button onClick={() => handleMostrarColaboracao(colaborador)}>
                            {colaborador}
                        </button>
                    </div>
                ))}
                  <ModalButton onClick={FecharContribuicoesModal}>Sair</ModalButton>
              </div>
              </DivColaboracoes>
            </Modal>
        }

        {ContribuicoesContribuidores &&  
        <Modal>  
            <ContentComentários>
            {msgContribuicoes.map((msg, index) => (
                        <div key={index}>
                            <p>{msg.colaboracao}</p>
                        </div>
                      ))}
                      <ModalButton onClick={FecharMsgContribuicoes}>voltar</ModalButton>
            </ContentComentários>
        </Modal>
        }
    </>
  )
}

export default ModalEditor