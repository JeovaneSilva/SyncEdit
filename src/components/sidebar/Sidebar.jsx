import React, {useState} from 'react'
import { SideBar, Content, DivListAmigos,ModalContentExcluir, Overlay} from './styleSidebar'
import { Modal,ModalButton} from '../modal/stylesModais'
import { auth,db } from '../../firebase/firebaseConfig';
import { FaTimes, FaUserCircle, FaTrash} from "react-icons/fa";

const Sidebar = ({setSideBar,uid,userName,setnomesAmigos,nomesAmigos,closeSidebar}) => {
    
  const [amigoParaExcluir, setAmigoParaExcluir] = useState('');
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);

  const LogOut = () =>{
    auth.signOut().then(() => {
      window.location.href="/"
    }).catch(() => {
      alert('Erro ao fazer LogOut')
    })
  }

    const openModalExcluir = (amigo) => {
        setAmigoParaExcluir(amigo);
        setModalExcluirOpen(true);
      }

      const deletarAmigo = async (nomeAmigo) => {
        try {
          const snapshot = await db.ref(`users/${uid}/amigos`).orderByChild('userName').equalTo(nomeAmigo).once('value');
          const amigoKey = Object.keys(snapshot.val())[0];
    
          await db.ref(`users/${uid}/amigos/${amigoKey}`).remove();
          console.log("Amigo deletado com sucesso!");
        } catch (error) {
          console.error("Erro ao deletar amigo:", error);
        }
      }
    
      const confirmarExclusaoAmigo = () => {
        setnomesAmigos(nomesAmigos.filter(nome => nome !== amigoParaExcluir))
        deletarAmigo(amigoParaExcluir);
        closeModalExcluir();
      }

      const closeModalExcluir = () => {
        setModalExcluirOpen(false);
      }

  return (
    <>
    <SideBar $sidebar={setSideBar}>
        <FaTimes onClick={closeSidebar} />
        <Content>
        <FaUserCircle />
        <h1>{userName}</h1>
        <button onClick={LogOut} >Sair</button>
        <DivListAmigos>
            <h2>Lista de Amigos</h2>
            <div>
                {nomesAmigos.map((nome, index) => (
                    <div key={index}>
                    <div>
                        <FaUserCircle />
                        <p>{nome}</p>
                    </div>
                    <div>
                        <FaTrash onClick={() => openModalExcluir(nome)} />
                    </div>
                    </div>
                ))}
            </div>
        </DivListAmigos>
        
        </Content>
    </SideBar> 
    <Overlay onClick={closeSidebar} />
    {modalExcluirOpen &&
        <Modal>
        <ModalContentExcluir>
            <p>Deseja realmente excluir {amigoParaExcluir}?</p>
            <div>
            <ModalButton onClick={confirmarExclusaoAmigo}>Confirmar</ModalButton>
            <ModalButton onClick={closeModalExcluir}>Cancelar</ModalButton>
            </div>
        </ModalContentExcluir>
        </Modal>
    }
  </>
  )
}

export default Sidebar