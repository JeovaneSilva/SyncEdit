import React, { useState, useEffect, useRef, useMemo} from 'react';
import { FaPlus, FaBars,FaEdit, FaTrash, FaTimes, FaUserCircle,FaRegPlusSquare} from "react-icons/fa";
import { auth, db } from '../../firebaseConfig'
import JoditEditor from 'jodit-react';
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
  ModalContentExcluir,
  ModalContentDocumento,
  ModalButton,
  ModalEditor,
  FooterEditor,
  ModalContentAddAmigo
} from './styleHome'



const Home = () => {

  const DivHome = useRef()
  const inputsearch = useRef()
  const editor = useRef(null)
  const ButonSalvar = useRef(null)

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [uid, setUid] = useState('');
  const [sidebar, setSideBar] = useState(false)
  const [nomesUsuarios, setNomesUsuarios] = useState([]);
  const [nomesAmigos, setnomesAmigos] = useState([]);
  const [search, setSearch] = useState('');
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [textLoading, setTextLoading] = useState('Carregando');
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  const [modalExcluirProjetoOpen, setModalExcluirProjetoOpen] = useState(false);
  const [modalCriarDocOpen, setModalCriarDocOpen] = useState(false);
  const [modalEditor, setModalEditor] = useState(false);
  const [modalEditorColaborador, setModalEditorColaborador] = useState(false);
  const [modalAddAmigoProject, setmodalAddAmigoProject] = useState(false);
  const [amigoParaExcluir, setAmigoParaExcluir] = useState('');
  const [nomeProjeto, setnomeProjeto] = useState('');
  const [newProjeto, setnewProjeto] = useState([]);
  const [projetosColaborador, setProjetosColaborador] = useState([]);
  const [projetoExcluir, setprojetoExcluir] = useState('');
  const [content, setContent] = useState('')


  const CarregarProjetosProprios = async () => {
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).once('value');
      const projetosData = snapshot.val();
  
      if (projetosData) {
        const projetosArray = Object.entries(projetosData).map(([key, projeto]) => ({
          id: key,
          nameProject: projeto.nameProject,
          ultimoAcesso: projeto.ultimoAcesso,
          colaboradores: projeto.colaboradores ? Object.keys(projeto.colaboradores).length : 0,
          colaborador: false // Definir como falso, pois o usuário é o criador deste projeto
        }));
        setnewProjeto(projetosArray);
      } else {
        setnewProjeto([]);
      }
    } catch (error) {
      console.error("Erro ao carregar projetos próprios do usuário:", error);
    }
  };

  const CarregarProjetosColaborador = async () => {
    try {
      const snapshot = await db.ref(`users`).once('value');
      const usersData = snapshot.val();
      const projetosColaboradorArray = [];
  
      if (usersData) {
        Object.values(usersData).forEach((user) => {
          if (user.documentos) {
            Object.entries(user.documentos).forEach(([key, projeto]) => {
              if (projeto.colaboradores && projeto.colaboradores[userName]) {
                projetosColaboradorArray.push({
                  id: key,
                  nameProject: projeto.nameProject,
                  ultimoAcesso: projeto.ultimoAcesso,
                  colaboradores: projeto.colaboradores ? Object.keys(projeto.colaboradores).length : 0,
                  colaborador: true, // Definir como verdadeiro, pois o usuário é um colaborador deste projeto
                  texto: projeto.text // Adicionar o texto do projeto ao objeto
                });
              }
            });
          }
        });
      }
      setProjetosColaborador(projetosColaboradorArray);
    } catch (error) {
      console.error("Erro ao carregar projetos de colaborador do usuário:", error);
    }
  };

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

  const openModalExcluir = (amigo) => {
    setAmigoParaExcluir(amigo);
    setModalExcluirOpen(true);
  }
  
  const closeModalExcluir = () => {
    setModalExcluirOpen(false);
  }

  const openModalExcluirProjeto = (nomeProjeto) => {
    setprojetoExcluir(nomeProjeto);
    setModalExcluirProjetoOpen(true);
  }

  const closeModalExcluirProjeto = () => {
    setModalExcluirProjetoOpen(false);
  }

  const openModalNovoDoc = () => {
    setModalCriarDocOpen(true);
  }

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

  const closeEditor = async () => {
      setModalEditor(false);
      CarregarProjetosProprios();
      CarregarProjetosColaborador();
  }

  const changeContent = async (newContent) => {
    setContent(newContent)
    ButonSalvar.current.disabled=false
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

// Função para fechar o editor do colaborador
const closeEditorColaborador = async () => {
    setModalEditorColaborador(false);
    CarregarProjetosProprios();
    CarregarProjetosColaborador();
};

const salvarContent = async () => {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const dataFormatada = `${ano}-${mes}-${dia}`;

  try {
    // Obtém o texto atual do projeto antes de atualizá-lo

    const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
    snapshot.forEach((projetoSnapshot) => {
      
      // Atualiza o texto e o último acesso do projeto
      projetoSnapshot.ref.update({
        text: content,
        ultimoAcesso: dataFormatada
      });
      
    });
    
  } catch (error) {
    console.error("Erro ao salvar o texto do projeto:", error);
  }
};

const SalvarContentColab = async () => {
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
                text: content,
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
}

const changeContentColaboradores = async(newContent) => {
  setContent(newContent)
  
}

  const closeModalNovoDoc = () => {
    setModalCriarDocOpen(false);
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
    closeModalExcluir();
  }

  const deletarProjeto = async (nomeProjeto) => {
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
      const projetoKey = Object.keys(snapshot.val())[0];

      await db.ref(`users/${uid}/documentos/${projetoKey}`).remove();
      CarregarProjetosProprios()
    } catch (error) {
      console.error("Erro ao deletar amigo:", error);
    }
  }

  const confirmarDeletarProjeto = () => {
    setnewProjeto(newProjeto.filter(nomeProjeto => nomeProjeto !== projetoExcluir))
    deletarProjeto(projetoExcluir);
    closeModalExcluirProjeto();
  }

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
      CarregarProjetosProprios();
  
      // Fecha o modal após adicionar o novo documento
      closeModalNovoDoc();
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
    }
  }


  useEffect(() => {
    
    // Chamada da função para recuperar os nomes de amigos ao montar o componente
    CarregarProjetosProprios();
    // Adicione uid como dependência para garantir que useEffect seja executado sempre que uid mudar
  }, [userName]);

  useEffect(() => {
    
    // Chamada da função para recuperar os nomes de amigos ao montar o componente
    CarregarProjetosColaborador();
    // Adicione uid como dependência para garantir que useEffect seja executado sempre que uid mudar
  }, [userName]);

  const filteredUsuarios = nomesUsuarios
  .filter(nome => nome && nome !== userName) // Verifica se nome não é undefined antes de fazer o filtro
  .filter(nome => nome.toLowerCase().includes(search.toLowerCase()));


  const config = useMemo(() => ({
    height: "75vh"
  }), []); // A configuração só será recriada se as dependências mudarem

  const NovoColaborador = async (nome) => {
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
      const projetoKey = Object.keys(snapshot.val())[0];
  
      // Recuperar a lista atual de colaboradores do projeto
      const colaboradoresAtuais = snapshot.val()[projetoKey].colaboradores || {};
      
      // Adicionar o novo colaborador à lista
      colaboradoresAtuais[nome] = true;
  
      // Atualizar a lista de colaboradores no banco de dados
      await db.ref(`users/${uid}/documentos/${projetoKey}`).update({
        colaboradores: colaboradoresAtuais
      });
      
      // Atualizar a lista de projetos
      CarregarProjetosProprios();
    } catch (error) {
      console.error("Erro ao adicionar novo colaborador:", error);
    }
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
                            <FaTrash onClick={() => openModalExcluir(nome)} />
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
              </CardAdd>

          </CardsProjetos>     
      </Section>

      {modalEditor &&
        <ModalEditor>
          <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onChange={changeContent}
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
                <button ref={ButonSalvar} onClick={salvarContent}>Salvar</button>
                <button onClick={closeEditor}>Fechar</button>
              </div> 

              <div>
                <button>Baixar</button>
                <button onClick={() => setmodalAddAmigoProject(true)}>Convidar</button>
              </div>

            </div>
          </FooterEditor>  
        </ModalEditor>
      }

      {modalEditorColaborador && 
        <ModalEditor>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onChange={changeContentColaboradores}
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
          
      </ModalEditor>
      }

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

      {modalExcluirProjetoOpen &&
        <Modal>
          <ModalContentExcluir>
            <p>Deseja realmente excluir {projetoExcluir}?</p>
            <div>
              <ModalButton onClick={confirmarDeletarProjeto}>Confirmar</ModalButton>
              <ModalButton onClick={closeModalExcluirProjeto}>Cancelar</ModalButton>
            </div>
          </ModalContentExcluir>
        </Modal>
      }

      {modalCriarDocOpen &&
        <Modal>
          <ModalContentDocumento>
            <p>Insira o nome do documento</p>
            <input type="text" onChange={(e) => setnomeProjeto(e.target.value)}/>
            <div>
              <ModalButton onClick={ConfirmNovoDoc}>Confirmar</ModalButton>
              <ModalButton onClick={closeModalNovoDoc}>Cancelar</ModalButton>
            </div>
          </ModalContentDocumento>
        </Modal>
      }

      {modalAddAmigoProject && 
        <Modal>
          <ModalContentAddAmigo>
          {nomesAmigos.map((nome, index) => (
                        <div key={index}>
                            <p>{nome}</p>
                            <FaPlus onClick={() => NovoColaborador(nome)}/>
                        </div>
                      ))}
                      <ModalButton onClick={() => setmodalAddAmigoProject(false)}>Sair</ModalButton>
          </ModalContentAddAmigo>
        </Modal>}
      
    </HomeDiv>
  )
}

export default Home