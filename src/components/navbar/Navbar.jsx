import React, {useState,useRef} from 'react'
import { HeaderContainer,Logo, DivPesquisa,MenuToggle} from './stylenavbar'
import LogoProjeto from '../../../public/logoSyncEdit.png'
import { FaBars} from "react-icons/fa";
import Sidebar from '../sidebar/Sidebar';

const Navbar = ({DivHome,userName,nomesAmigos,setnomesAmigos,uid,setMostrarUsuarios,setSearch,search}) => {

    const inputsearch = useRef()
     
    const [sidebar, setSideBar] = useState(false)

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        setMostrarUsuarios(value !== ''); // Define mostrarUsuarios como true se o campo de pesquisa não estiver vazio
      }

    const ShowSidebar = () => {
        setSideBar(!sidebar)
        DivHome.current.style.overflow= 'hidden';
    }
  
    const closeSidebar = () => {
      setSideBar(false)
      DivHome.current.style.overflow= 'auto';
  }

  // const handleBlur = () => {
  //   setSearch("");
  // };

  return (
    <HeaderContainer>
        <Logo>
          <img src={LogoProjeto} alt="Logo" />
        </Logo>
        <DivPesquisa>
          <input type="search" name="BuscarUsers" value={search} onChange={handleSearchChange} ref={inputsearch} placeholder='Buscar Usuários'/>
        </DivPesquisa>
        <MenuToggle>
          <FaBars onClick={ShowSidebar}/>
          {sidebar && 
            <Sidebar
            setSideBar={setSideBar}
            userName={userName}
            nomesAmigos={nomesAmigos}
            closeSidebar={closeSidebar}
            setnomesAmigos={setnomesAmigos}
            uid={uid}
            />
          }
        </MenuToggle>
        
      </HeaderContainer>
  )
}

export default Navbar