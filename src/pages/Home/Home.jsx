import React, { useState, useEffect, useRef} from 'react';
import Cards from '../../components/cards/Cards';
import Navbar from '../../components/navbar/Navbar';
import Search from '../../components/search/Search';
import { HomeDiv,Section } from './styleHome'
import {fetchUserName, recuperarNomesUsuarios,recuperarNomesAmigos } from '../../firebase/firebaseFunctions';

const Home = () => {

  const DivHome = useRef()
  
  const [userName, setUserName] = useState('');
  const [uid, setUid] = useState('');
  const [nomesUsuarios, setNomesUsuarios] = useState([]);
  const [nomesAmigos, setnomesAmigos] = useState([]);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetchUserName(setUid,setUserName);
    recuperarNomesUsuarios(uid,setNomesUsuarios);
  }, []);

  useEffect(() => {
    recuperarNomesAmigos(uid,setnomesAmigos);
  }, [userName]);

  return (
    <HomeDiv ref={DivHome}>

     <Navbar
      DivHome={DivHome}
      userName={userName}
      nomesAmigos={nomesAmigos}
      setnomesAmigos={setnomesAmigos}
      uid={uid}
      setMostrarUsuarios={setMostrarUsuarios}
      setSearch={setSearch}
      search={search}
     />
     
      <Section>
      {mostrarUsuarios && (
        <Search
        nomesUsuarios={nomesUsuarios}
        userName={userName}
        search={search}
        nomesAmigos={nomesAmigos}
        uid={uid}
        setnomesAmigos={setnomesAmigos}
        />
      )}
          <h1>Documentos de Texto</h1>

          <Cards
            uid={uid}
            userName={userName}
            nomesAmigos={nomesAmigos}
          />
  
      </Section>
    </HomeDiv>
  )
}

export default Home