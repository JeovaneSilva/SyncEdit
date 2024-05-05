import { auth, db } from './firebaseConfig';

// carregar o username do usuário logado
export const fetchUserName = async (setUid,setUserName) => {
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

// carregar o username de todos os usuários
export const recuperarNomesUsuarios = async (uid,setNomesUsuarios) => {
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

// pegar o nome de todos os amigos
export const recuperarNomesAmigos = async (uid,setnomesAmigos) => {
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

// carregar todos os projetos propios
export const CarregarProjetosProprios = async (uid, setnewProjeto) => {
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

//   carregar todos os projetos colaboradores
export const CarregarProjetosColaborador = async (uid, userName, setProjetosColaborador) => {
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

  // adicionar colaboradores
  export const fetchColaboradores = async (uid,nomeProjeto,setTodosColaboradores) => {
    try {
      const snapshot = await db.ref(`users/${uid}/documentos`).orderByChild('nameProject').equalTo(nomeProjeto).once('value');
      const projetoKey = Object.keys(snapshot.val())[0];
      const colaboradoresAtuais = snapshot.val()[projetoKey].colaboradores || {};
      setTodosColaboradores(colaboradoresAtuais);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    }
  };

  export const fetchColaboradoresDoProjeto = async (uid, nomeProjeto, setColaboradoresProjeto) => {
    try {
      const snapshot = await db.ref(`users`).once('value');
      const usersData = snapshot.val();
      const colaboradoresProjetoArray = [];
  
      if (usersData) {
        Object.values(usersData).forEach((user) => {
          if (user.documentos) {
            Object.entries(user.documentos).forEach(([key, projeto]) => {
              if (projeto.nameProject === nomeProjeto && projeto.colaboradores) {
                Object.keys(projeto.colaboradores).forEach((colaborador) => {
                  if (colaborador !== uid) { // Excluir o próprio usuário da lista de colaboradores
                    colaboradoresProjetoArray.push({
                      uid: colaborador,
                      nome: colaborador, // Aqui você pode adicionar mais detalhes do colaborador, como nome, se necessário
                    });
                  }
                });
              }
            });
          }
        });
      }
      setColaboradoresProjeto(colaboradoresProjetoArray);
    } catch (error) {
      console.error("Erro ao buscar colaboradores do projeto:", error);
    }
  };