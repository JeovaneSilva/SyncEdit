import React,{useState,useEffect} from 'react'
import { Modal,ModalContentAddAmigo,ModalButton } from './stylesModais'
import { fetchColaboradoresDoProjeto } from '../../firebase/firebaseFunctions'

const ModalMostrarMenbros = ({uid,nomeProjeto,setModalMenbros}) => {

    const [todosColaboradores, setTodosColaboradores] = useState([])

    useEffect(() => {
        fetchColaboradoresDoProjeto(uid,nomeProjeto,setTodosColaboradores);
      }, [uid,nomeProjeto]); 

  return (
    <Modal>
          <ModalContentAddAmigo>
            {todosColaboradores.map((colaborador, index) => (
                <div key={index}>
                    <p>{colaborador.nome}</p>
                </div>
            ))}
            <ModalButton onClick={() => setModalMenbros(false)}>Sair</ModalButton>
          </ModalContentAddAmigo>
    </Modal>
  )
}

export default ModalMostrarMenbros