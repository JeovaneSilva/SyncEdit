import React, { useState, useEffect, useRef} from 'react';
import { FaPlus, FaBars,FaEdit, FaTrash, FaTimes, FaUserCircle,FaRegPlusSquare} from "react-icons/fa";
import LogoProjeto from '../../../public/logoSyncEdit.png'
import { HomeDiv,
  LoadingBar,
  HeaderContainer,
  Logo, 
  DivPesquisa, 
  MenuToggle,
  SideBar, 
  Content, 
  Section,
  CardsProjetos,  
  Card,
  CardAdd,
  InfoCard,  
  IconsCard,
  DivListAmigos,
  Overlay,
  Modal,
  ModalContent,
  ModalButton
} from './styleHome'

import { auth, db } from '../../firebaseConfig'

const Home = () => {

  const DivHome = useRef()
  const inputsearch = useRef()

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [uid, setUid] = useState('');
  const [sidebar, setSideBar] = useState(false)
  const [nomesUsuarios, setNomesUsuarios] = useState([]);
  const [nomesAmigos, setnomesAmigos] = useState([]);
  const [search, setSearch] = useState('');
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [textLoading, setTextLoading] = useState('Carregando');
  const [modalOpen, setModalOpen] = useState(false);
  const [amigoParaExcluir, setAmigoParaExcluir] = useState('');

  
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            const userId = user.uid;
            setUid(userId)
            const userRef = db.ref(`users/${userId}/userName`);
            userRef.on('value', (snapshot) => {
              const name = snapshot.val();
              if (name) {
                setUserName(name);
              }
            });
          } 
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Erro ao obter o nome de usuário:', error);
      }
    };
    fetchUserName();
  }, []);

  

  useEffect(() => {
    // Função assíncrona para recuperar os nomes de usuários do Firebase
    const recuperarNomesUsuarios = async () => {
      try {
        const snapshot = await db.ref('users').once('value');
        const usersData = snapshot.val();

        if (usersData) {
          const usersNames = Object.values(usersData).map(user => user.userName);
          setNomesUsuarios(usersNames)
        } else {
          setNomesUsuarios([]);
        }
      } catch (error) {
        console.error("Erro ao recuperar nomes de usuários:", error);
      }
    };

    // Chamada da função para recuperar os nomes de usuários ao montar o componente
    recuperarNomesUsuarios();
  }, []); // Executar apenas uma vez ao montar o componente

 

  useEffect(() => {
    // Função assíncrona para recuperar os nomes de amigos do Firebase
    const recuperarNomesAmigos = async () => {
      try {
        const snapshot = await db.ref(`users/${uid}/amigos`).once('value');
        const amigosData = snapshot.val();
  
        if (amigosData) {
          const amigosNames = Object.values(amigosData).map(amigo => amigo.userName);
          setnomesAmigos(amigosNames);
        } else {
          setnomesAmigos([]);
        }
      } catch (error) {
        console.error("Erro ao recuperar nomes de amigos:", error);
      }
    };
  
    // Chamada da função para recuperar os nomes de amigos ao montar o componente
    recuperarNomesAmigos();
  
    // Adicione uid como dependência para garantir que useEffect seja executado sempre que uid mudar
  }, [userName]);
  


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setMostrarUsuarios(value !== ''); // Define mostrarUsuarios como true se o campo de pesquisa não estiver vazio
  }


  const filteredUsuarios = nomesUsuarios.filter(nome => nome !== userName).filter(nome => nome.toLowerCase().includes(search.toLowerCase()));


  const LogOut = (e) =>{
    auth.signOut().then(() => {
      window.location.href="/"
    }).catch(() => {
      alert('Erro ao fazer LogOut')
    })
  }

  

  const ShowSidebar = () => {
      setSideBar(!sidebar)
      DivHome.current.style.overflow= 'hidden';
  }

  const closeSidebar = () => {
    setSideBar(false)
    DivHome.current.style.overflow= 'auto';
}

const openModal = (amigo) => {
  setAmigoParaExcluir(amigo);
  setModalOpen(true);
}

const closeModal = () => {
  setModalOpen(false);
}

const addAmigo = async (nomeAmigo) => {
  try {
    setLoading(true);
    await db.ref(`users/${uid}/amigos`).push({
      userName: nomeAmigo,
    });
  } catch (error) {
    console.error("Erro ao adicionar amigo:", error);
  } finally {
    setTimeout(() => {
      setTextLoading("Amigo adicionado com sucesso!");
      setnomesAmigos([...nomesAmigos, nomeAmigo])
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }, 2000); // Mudado de 3000 para 7000 para incluir os 2 segundos adicionais
  }
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
  closeModal();
}

const CriarDocumento = () => {
  
}

  return (
    <HomeDiv ref={DivHome}>

     <HeaderContainer>
        <Logo>
          <img src={LogoProjeto} alt="Logo" />
        </Logo>
        <DivPesquisa>
          <input type="search" name="BuscarUsers" value={search} onChange={handleSearchChange} ref={inputsearch} placeholder='Buscar Usuários' />
          {loading && <LoadingBar>
            <p>{textLoading}</p>
            <hr />
         </LoadingBar>}
        </DivPesquisa>
        <MenuToggle>
          <FaBars onClick={ShowSidebar}/>
          {sidebar && 
          <SideBar $sidebar={setSideBar}>
            <FaTimes onClick={closeSidebar}/>
            <Content>
              <FaUserCircle />
              <h1>{userName}</h1>
              <button onClick={LogOut}>Sair</button>
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
                            <FaTrash onClick={() => openModal(nome)} />
                          </div>
                        </div>
                      ))}
                  </div>
              </DivListAmigos>
              
            </Content>
          </SideBar> }
        </MenuToggle>
        {sidebar && <Overlay onClick={closeSidebar} />}
      </HeaderContainer>
       {/* Mostrar barra de carregamento quando loading for true */}
      <Section>
      {mostrarUsuarios && (
        <div>
          {filteredUsuarios.map((nome, index) => (
            <div key={index}>
              <p>{nome}</p>
              {!nomesAmigos.includes(nome) && (
                <button onClick={() => addAmigo(nome)}>
                  <FaPlus />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
          <h1>Documentos de Texto</h1>

          <CardsProjetos>

              <Card>
                <InfoCard>
                  <h2>Teste</h2>
                  <p>Ultimo Acesso: 30/01/2024 </p>
                  <h3>Colaboradores</h3>
                  <span>0</span>
                </InfoCard>

                <IconsCard>
                  <div className="editarIcon">
                    <FaEdit />
                  </div>
                  <div className="deletarIcon">
                  <FaTrash />
                  </div>
                </IconsCard>

              </Card> 

              <CardAdd>
                <FaRegPlusSquare onClick={CriarDocumento} />
              </CardAdd>

          </CardsProjetos>     
      </Section>

      {modalOpen &&
        <Modal>
          <ModalContent>
            <p>Deseja realmente excluir {amigoParaExcluir}?</p>
            <div>
              <ModalButton onClick={confirmarExclusaoAmigo}>Confirmar</ModalButton>
              <ModalButton onClick={closeModal}>Cancelar</ModalButton>
            </div>
          </ModalContent>
        </Modal>
      }
    </HomeDiv>
  )
}

export default Home