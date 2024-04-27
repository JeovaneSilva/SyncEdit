import React, { useState, useEffect, useRef} from 'react';
import { FaSearch, FaBars,FaEdit, FaTrash, FaTimes, FaUserCircle} from "react-icons/fa";
import LogoProjeto from '../../../public/logoSyncEdit.png'
import { HomeDiv,HeaderContainer, Logo, DivPesquisa, MenuToggle,SideBar, Content, Section, CardsProjetos, Card, InfoCard, IconsCard} from './styleHome'

import { auth, db } from '../../firebaseConfig'

const Home = () => {
  
  const [userName, setUserName] = useState('');
  const DivHome = useRef()


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            const userId = user.uid;
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

  const LogOut = (e) =>{
    auth.signOut().then(() => {
      window.location.href="/"
    }).catch(() => {
      alert('Erro ao fazer LogOut')
    })
  }

  const [sidebar, setSideBar] = useState(false)

  const ShowSidebar = () => {
      setSideBar(!sidebar)
      DivHome.current.style.overflow= 'hidden';
  }

  const closeSidebar = () => {
    setSideBar(false)
    DivHome.current.style.overflow= 'auto';
}

  return (
    <HomeDiv ref={DivHome}>

     <HeaderContainer>
        <Logo>
          <img src={LogoProjeto} alt="Logo" />
        </Logo>
        <DivPesquisa>
          <input type="search" name="BuscarUsers" id="BuscarUsers" placeholder='Buscar Usuários' />
          <div className="IconLupa">
            <FaSearch />
          </div>
        </DivPesquisa>
        <MenuToggle>
          <FaBars onClick={ShowSidebar}/>
          {sidebar && <SideBar $sidebar={setSideBar}>
                        <FaTimes onClick={closeSidebar}/>
                          <Content>
                            <FaUserCircle />
                            <h1>{userName}</h1>
                            <button onClick={LogOut}>Sair</button>
                          </Content>
                      </SideBar> }
        </MenuToggle>
      </HeaderContainer>
      
      <Section>
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
              <Card>

                <InfoCard>
                  <h2>Teste</h2>
                  <p>Ultimo Acesso: 30/01/2024 </p>
                  <h3>Colaboradores</h3>
                  <span>1</span>
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
              <Card>

                <InfoCard>
                  <h2>Teste</h2>
                  <p>Ultimo Acesso: 30/01/2024 </p>
                  <h3>Colaboradores</h3>
                  <span>2</span>
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
              <Card>

                <InfoCard>
                  <h2>Teste</h2>
                  <p>Ultimo Acesso: 30/01/2024 </p>
                  <h3>Colaboradores</h3>
                  <span>4</span>
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
              <Card>

                <InfoCard>
                  <h2>Teste</h2>
                  <p>Ultimo Acesso: 30/01/2024 </p>
                  <h3>Colaboradores</h3>
                  <span>5</span>
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
              <Card>

                <InfoCard>
                  <h2>Teste</h2>
                  <p>Ultimo Acesso: 30/01/2024 </p>
                  <h3>Colaboradores</h3>
                  <span>6</span>
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

          </CardsProjetos>     
      </Section>
    </HomeDiv>
  )
}

export default Home