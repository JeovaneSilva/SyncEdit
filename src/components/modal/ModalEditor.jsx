import React, {useState,useRef,useMemo} from 'react'
import {FaEdit, FaSyncAlt } from "react-icons/fa";
import JoditEditor from 'jodit-react';
import { db } from '../../firebase/firebaseConfig';
import ModalAddAmigoProject from './ModalAddAmigoProject';
import { ModalEditorDiv,FooterEditor } from './stylesModais'
import { CarregarProjetosProprios} from '../../firebase/firebaseFunctions';
import html2pdf from 'html2pdf.js';

const ModalEditor = ({setContent,content,uid,nomeProjeto,setModalEditor,setnewProjeto,nomesAmigos}) => {

    const editor = useRef(null)
    const ButonSalvar = useRef(null)
    const [modalAddAmigoProject, setmodalAddAmigoProject] = useState(false);
    const [nomeEditado, setNomeEditado] = useState('');

    const config = useMemo(() => ({
        height: "75vh",
        placeholder: ''
      }), []); // A configuração só será recriada se as dependências mudarem

    const salvarContent = async () => {
      try {
        // Obtém o texto atual do projeto antes de atualizá-lo
        const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
        snapshot.forEach((projetoSnapshot) => {
          
          // Atualiza o texto e o último acesso do projeto
          projetoSnapshot.ref.update({
            text: editor.current.value,
          });
          
        });
        alert("salvo")
        
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

      const RecarregarEditor = async () => {
      
        try {
          const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
          const projetoKey = Object.keys(snapshot.val())[0];
          const textoProjeto = snapshot.val()[projetoKey].text;
          setContent(textoProjeto);
        } catch (error) {
          console.error("Erro ao recuperar texto do projeto:", error);
        }
      }

  return (
    <>
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
                <input type="text" onChange={handleNomeChange} placeholder={nomeProjeto} />
                {nomeEditado && <FaEdit onClick={MudarNomeProjeto} />}
                <FaSyncAlt onClick={RecarregarEditor} />
              </div>
            </div>

            <div>
            
              <div>
                <button ref={ButonSalvar} onClick={salvarContent}>Salvar</button>
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
    </>
  )
}

export default ModalEditor