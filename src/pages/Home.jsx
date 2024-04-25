import React, { useState, useEffect } from 'react';
import LogoProjeto from '../../public/logoSyncEdit.png'
import { auth, db } from '../firebaseConfig'
import { FaSearch, FaBars, FaEdit, FaTrash } from "react-icons/fa";
import { Header, Logo, DivPesquisa, MenuToggle, Section, CardsProjetos, Card, InfoCard, IconsCard } from '../styles/Home'

const Home = () => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Função para recuperar o nome de usuário
    const fetchUserName = async () => {
        try {
            // Adicionar um listener para detectar mudanças no estado de autenticação
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    // Se o usuário estiver autenticado, obter o nome de usuário do banco de dados
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

            // Retornar uma função de limpeza para remover o listener quando o componente for desmontado
            return () => {
                unsubscribe(); // Remover o listener
            };
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
          <FaBars />
        </MenuToggle>
    </Header>

     
    <Section>
        <h1>Documentos de Texto</h1>
        <div>
                <p>Bem-vindo, {userName}!</p>
                <button onClick={LogOut}>Sair</button>
        </div>

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