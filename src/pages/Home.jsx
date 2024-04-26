import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBars, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import { Header, Logo, DivPesquisa, MenuToggle, Section, CardsProjetos, Card, InfoCard, IconsCard, Sidebar,Overlay} from '../styles/Home'

import LogoProjeto from '../../public/logoSyncEdit.png'
import { auth, db } from '../firebaseConfig'

const Home = () => {
  const MenuToggleRef = useRef()
  const SidebarRef = useRef()
  const OverlayDiv = useRef()

  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [overlayPointerEvents, setOverlayPointerEvents] = useState('none');

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setOverlayPointerEvents(isSidebarOpen ? 'none' : 'auto');
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setOverlayPointerEvents('none');
  };

  const handleOverlayClick = () => {
    closeSidebar();
  };

  return (
    <>
      <Header>
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
          <button onClick={toggleSidebar} ref={MenuToggleRef}><FaBars /></button>
        </MenuToggle>
      </Header>
      <Overlay $isOpen={isSidebarOpen} onClick={handleOverlayClick} ref={OverlayDiv} style={{ pointerEvents: overlayPointerEvents }} />
      <Sidebar $isOpen={isSidebarOpen} ref={SidebarRef}>
        <div>
          <button onClick={closeSidebar}><FaArrowRight /></button>
        </div>
        <h1>{userName}</h1>
        <button onClick={LogOut}>Sair</button>

      </Sidebar>
     
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
    </>
  )
}

export default Home