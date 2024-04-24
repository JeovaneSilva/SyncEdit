import React from 'react'
import LogoProjeto from '../../public/logoSyncEdit.png'
import { FaSearch, FaBars, FaEdit, FaTrash } from "react-icons/fa";
import { Header, Logo, DivPesquisa, MenuToggle, Section, CardsProjetos, Card, InfoCard, IconsCard } from '../styles/Home'

const Home = () => {
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