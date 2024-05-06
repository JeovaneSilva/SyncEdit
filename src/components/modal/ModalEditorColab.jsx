import React, {useState,useRef,useMemo, useEffect} from 'react'
import {FaEdit, FaSyncAlt} from "react-icons/fa";
// import JoditEditor from 'jodit-react';
import { ModalEditorDiv,FooterEditor } from './stylesModais'
import { CarregarProjetosColaborador } from '../../firebase/firebaseFunctions';
import { db } from '../../firebase/firebaseConfig';
import html2pdf from 'html2pdf.js';
import ModalMostrarMenbros from './ModalMostrarMenbros';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalEditorColab = ({setContent,content,nomeProjeto,setModalEditorColaborador,uid,userName,setProjetosColaborador}) => {

  const editor = useRef(null)
  const ButonSalvar = useRef(null)

  const [nomeEditado, setNomeEditado] = useState('');
  const [modalMenbros, setModalMenbros] = useState(false)

  // const config = useMemo(() => ({
  //     height: "75vh",
  //     placeholder: '',
  //     autofocus: true,
  //     readonly: false,
	// 	  cursorAfterAutofocus: 'end'
  //   }), []); 

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
                  text: content
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

  const handleContentChange = async (newContent) => {
    setContent(newContent);
    try {
      const snapshot = await db.ref(`users`).once('value');
      const usersData = snapshot.val();

      if (usersData) {
        Object.values(usersData).forEach(async (user) => {
          if (user.documentos) {
            Object.entries(user.documentos).forEach(async ([key, projeto]) => {
              if (projeto.nameProject === nomeProjeto && !projeto.colaborador) {
                await db.ref(`users/${user.id}/documentos/${key}`).update({
                  text: newContent
                })
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Erro ao salvar o texto do projeto colaborador:", error);
    }
  };

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
              if (projeto.nameProject === nomeProjeto && !projeto.colaborador) {
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

  const handleDownloadPDF = () => {
    const contentHtml = editor.current.value; 

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
    height: '75%',
    padding: '10px'
  };

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
              <button ref={ButonSalvar} onClick={SalvarContentColab}>Salvar</button>
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
      </>
  )
}

export default ModalEditorColab