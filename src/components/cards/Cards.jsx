import React, {useState, useEffect} from 'react'
import {CardsProjetos,Card,CardAdd,InfoCard,IconsCard, MobileAdd} from './styleCards'
import {FaEdit, FaTrash,FaRegPlusSquare} from "react-icons/fa";
import ModalEditor from '../modal/ModalEditor';
import ModalContentDocumento from '../modal/ModalContentDocumento';
import ModalExcluirProjeto from '../modal/ModalExcluirProjeto';
import { db } from '../../firebase/firebaseConfig';
import ModalEditorColab from '../modal/ModalEditorColab';
import { CarregarProjetosProprios,CarregarProjetosColaborador } from '../../firebase/firebaseFunctions';

const Cards = ({uid,userName,nomesAmigos}) => {

    const [modalEditor, setModalEditor] = useState(false);
    const [modalEditorColaborador, setModalEditorColaborador] = useState(false);
    const [nomeProjeto, setnomeProjeto] = useState('');
    const [modalCriarDocOpen, setModalCriarDocOpen] = useState(false);
    const [content, setContent] = useState('')
    const [modalExcluirProjetoOpen, setModalExcluirProjetoOpen] = useState(false);
    const [projetoExcluir, setprojetoExcluir] = useState('');
    const [newProjeto, setnewProjeto] = useState([]);
    const [projetosColaborador, setProjetosColaborador] = useState([]);

    useEffect(() => {
        CarregarProjetosProprios(uid, setnewProjeto);
        CarregarProjetosColaborador(uid, userName, setProjetosColaborador);
      }, [userName]);

    const openModalEditor = async (projeto) => {
        setnomeProjeto(projeto.nameProject);
        setModalEditor(true);
    
        try {
          const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(projeto.nameProject).once('value');
          const projetoKey = Object.keys(snapshot.val())[0];
          const textoProjeto = snapshot.val()[projetoKey].text;
          setContent(textoProjeto);
        } catch (error) {
          console.error("Erro ao recuperar texto do projeto:", error);
        }
      }

      const openModalEditorColaborador = async (projeto) => {
        try {
          const snapshot = await db.ref(`users`).once('value');
          const usersData = snapshot.val();
      
          if (usersData) {
            Object.values(usersData).forEach((user) => {
              if (user.documentos) {
                Object.entries(user.documentos).forEach(([key, doc]) => {
                  if (doc.nameProject === projeto.nameProject) {
                    setContent(doc.text || ''); // Verifica se o texto está definido
                    setnomeProjeto(projeto.nameProject);
                    setModalEditorColaborador(true);
                  }
                });
              }
            });
          }
        } catch (error) {
          console.error("Erro ao recuperar texto do projeto colaborador:", error);
        }
      };

      const openModalNovoDoc = () => {
        setModalCriarDocOpen(true);
      }

      const openModalExcluirProjeto = (nomeProjeto) => {
        setprojetoExcluir(nomeProjeto);
        setModalExcluirProjetoOpen(true);
      }
    
  return (
    <>
    <CardsProjetos>

      {newProjeto.map((projeto) => (
      <Card key={projeto.id}>
        <InfoCard>
          <h2>{projeto.nameProject}</h2>
          <p>Ultimo Acesso: {projeto.ultimoAcesso}</p>
          <h3>Colaboradores</h3>
          <span>{projeto.colaboradores}</span>
        </InfoCard>
        <IconsCard>
          <div>
            <FaEdit onClick={() => openModalEditor(projeto)} />
          </div>
          <div>
            <FaTrash onClick={() => openModalExcluirProjeto(projeto.nameProject)} />
          </div>
        </IconsCard>
      </Card>
      ))}

      {projetosColaborador.map((projeto) => (
      <Card key={projeto.id}>
        <InfoCard>
          <h2>{projeto.nameProject}</h2>
          <p>Ultimo Acesso: {projeto.ultimoAcesso}</p>
          <h3>Colaborador</h3>
          <span>{projeto.colaboradores}</span>
        </InfoCard>
        <IconsCard>
          <div>
            <FaEdit onClick={() => openModalEditorColaborador(projeto)} />
          </div>
        </IconsCard>
      </Card>
      ))}

      <CardAdd>
        <FaRegPlusSquare onClick={openModalNovoDoc} />
        <p>Adicionar</p>
      </CardAdd>  

    </CardsProjetos>

    <MobileAdd>
        <div>
          <FaRegPlusSquare onClick={openModalNovoDoc} />
        </div>
    </MobileAdd>   

{modalEditor &&
        <ModalEditor
        setContent={setContent}
        content={content}
        uid={uid}
        nomeProjeto={nomeProjeto}
        setModalEditor={setModalEditor}
        setnewProjeto={setnewProjeto}
        nomesAmigos={nomesAmigos}
        />
      }

{modalEditorColaborador && 
        <ModalEditorColab
        setContent={setContent}
        content={content}
        nomeProjeto={nomeProjeto}
        setModalEditorColaborador={setModalEditorColaborador}
        uid={uid}
        userName={userName}
        setProjetosColaborador={setProjetosColaborador}
        />
      }

{modalCriarDocOpen &&
        <ModalContentDocumento
        setnomeProjeto={setnomeProjeto}
        nomeProjeto={nomeProjeto}
        uid={uid}
        setnewProjeto={setnewProjeto}
        setModalCriarDocOpen={setModalCriarDocOpen}
        />
      }

{modalExcluirProjetoOpen &&
        <ModalExcluirProjeto
        projetoExcluir={projetoExcluir}
        setModalExcluirProjetoOpen={setModalExcluirProjetoOpen}
        uid={uid}
        setnewProjeto={setnewProjeto}
        newProjeto={newProjeto}
        />
      }

    </>
  )
}

export default Cards