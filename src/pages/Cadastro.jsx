import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig';
import TeamUp from '../../public/undraw_team_up_re_84ok.svg'
import { Main,TopForm, DadosForm,MostrarSenha,ButtonsForm, ButtonEntrarRegistrar, CadastrarDiv } from '../styles/LoginRegister'

const Cadastro = () => {

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const InputConfirmSenha = useRef()
    const passwordDoesntMatchError = useRef()
    const InputEmail = useRef();
    const emailRequiredError = useRef();
    const emailInvalidError = useRef();
    const InputSenha = useRef();
    const passwordRequiredError = useRef()
    const passwordMinLengthError = useRef()
    const fazerCadastro = useRef();

    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "/Home";
        }
    })


    const changeEmail = () => {
        const email = InputEmail.current.value
        emailRequiredError.current.style.display = email ? "none" : "block";
        
        emailInvalidError.current.style.display = validateEmail(email) ? "none" : "block";
    
        toggleRegisterButtonDisable();
    }

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [senha, setSenha] = useState('');
    const [ConfirmSenha, setConfirmSenha] = useState('')

    const handleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const handleChangeSenha = (e) => {
        setSenha(e.target.value);
        
        const password = InputSenha.current.value
        passwordRequiredError.current.style.display = password ? "none" : "block";
    
        passwordMinLengthError.current.style.display = password.length >= 6 ? "none" : "block";
    
        validatePasswordsMatch();
        toggleRegisterButtonDisable();
    }

    const handleChangeConfirmSenha = (e) => {
        setConfirmSenha(e.target.value)
        validatePasswordsMatch();
        toggleRegisterButtonDisable();
      }

    const Cadastrar = async (e) => {
        e.preventDefault()
        const email = InputEmail.current.value;
        const password = InputSenha.current.value;

        auth.createUserWithEmailAndPassword(
            email, password
        ).then(() => {
            console.log("Cadastrado com sucesso")
        }).catch(error => {
            alert(getErrorMessage(error));
        })
    }

    function getErrorMessage(error) {
        if (error.code == "auth/email-already-in-use") {
            return "Email já está em uso";
        }
        return error.message;
    }

    function validatePasswordsMatch() {
        const password = InputSenha.current.value;
        const confirmPassword = InputConfirmSenha.current.value;
    
        passwordDoesntMatchError.current.style.display =
            password == confirmPassword ? "none" : "block";
    }

    function toggleRegisterButtonDisable() {
        fazerCadastro.current.disabled = !isFormValid();
    }

    function isFormValid() {
        const email = InputEmail.current.value;
        if (!email || !validateEmail(email)) {
            return false;
        }
    
        const password = InputSenha.current.value;
        if (!password || password.length < 6) {
            return false;
        }
    
        const confirmPassword = InputConfirmSenha.current.value;
        if (password != confirmPassword) {
            return false;
        }
    
        return true;
    }

  return (
    <Main>
    <img src={TeamUp} alt="" />

    <form onSubmit={Cadastrar}>
        <TopForm>
            <h1>Cadastro</h1>
            <hr />
            <p>Seja Bem Vindo ao SyncEdit!</p>
        </TopForm>

        <div>
            <DadosForm>
                <label htmlFor="InputEmail">Email</label>
                <input type="text" name="InputEmail" ref={InputEmail} id="InputEmail" onChange={changeEmail}/>
                <div className="error" ref={emailInvalidError}>Email é inválido</div>
                <div className="error" ref={emailRequiredError}>Email é obrigatório</div>
            </DadosForm>

            <DadosForm>
                <label htmlFor="InputPassword">Senha</label>
                <input type={mostrarSenha ? 'text' : 'password'} value={senha} name="InputPassword" ref={InputSenha} id="InputPassword" onChange={handleChangeSenha}/>
                <div className="error" ref={passwordRequiredError}>Senha é obrigatória</div>
                <div className="error" ref={passwordMinLengthError}>Senha deve ter pelo menos 6 caracteres</div>
            </DadosForm>

            <DadosForm>
                <label htmlFor="InputConfirmPassword"> Confirmar Senha</label>
                <input type={mostrarSenha ? 'text' : 'password'} value={ConfirmSenha} name="InputConfirmPassword" ref={InputConfirmSenha} id="InputConfirmPassword" onChange={handleChangeConfirmSenha} />
                <div className="error" ref={passwordDoesntMatchError}>Senha e Confirmar senha devem ser iguais</div>
            </DadosForm>

            <MostrarSenha>
                <input type="checkbox" checked={mostrarSenha} onChange={handleMostrarSenha} />
                <p>Mostrar Senha</p>
            </MostrarSenha>

            <ButtonsForm>
                <ButtonEntrarRegistrar type="submit" disabled={true} ref={fazerCadastro}>Cadastrar</ButtonEntrarRegistrar>
            </ButtonsForm>

            <CadastrarDiv>
                <p>Já tem uma conta? </p>
                <Link to="/" ><button className='login'>Login</button></Link>
            </CadastrarDiv>
            
        </div>

    </form>
</Main>
  )
}

export default Cadastro