import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { Main,TopForm, DadosForm,MostrarSenha,ButtonsForm, ButtonEntrarRegistrar, EsqueciSenha, CadastrarDiv } from '../styles/LoginRegister'

import TeamUp from '../../public/undraw_team_up_re_84ok.svg'

const Login = () => {

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    
    const ElementRecuperarSenha = useRef();
    const ElementLogin = useRef();
    const InputEmail = useRef();
    const InputSenha = useRef();
    const emailRequiredError = useRef();
    const emailInvalidError = useRef();
    const passwordRequiredError = useRef()

    const FazerLogin = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(
            InputEmail.current.value, InputSenha.current.value
        ).then(() => {
            console.log("sucesso")
            window.location.href = "/Home";
        }).catch(error => {
            console.log("erro ao fazer login")
        });
    }

      const changeEmail = () => {
        toggleButtonsDisable();
        toggleEmailErrors();
      }

      const changeSenha = () => {
        toggleButtonsDisable();
        togglePasswordErrors();
      }

      function toggleEmailErrors() {
        const email = InputEmail.current.value
        emailRequiredError.current.style.display = email ? "none" : "block";
        
        emailInvalidError.current.style.display = validateEmail(email) ? "none" : "block";
    }
    
    function togglePasswordErrors() {
        const password = InputSenha.current.value
        passwordRequiredError.current.style.display = password ? "none" : "block";
    }

      function toggleButtonsDisable() {
        const emailValid = isEmailValid();
        ElementRecuperarSenha.current.disabled = !emailValid;
    
        const passwordValid = isPasswordValid();
        ElementLogin.current.disabled = !emailValid || !passwordValid;
    }

    function isEmailValid() {
        const email = InputEmail.current.value
        if (!email) {
            return false;
        }
        return validateEmail(email);
    }
    
    function isPasswordValid() {
        return InputSenha.current.value ? true : false;
    }


  return (
    <Main>
        <img src={TeamUp} alt="" />

        <form onSubmit={FazerLogin}>
            <TopForm>
                <h1>Login</h1>
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
                    <input type="password" name="InputPassword" ref={InputSenha} id="InputPassword" onChange={changeSenha}/>
                    <div className="error" ref={passwordRequiredError}>Senha é obrigatória</div>
                </DadosForm>

                <MostrarSenha>
                    <input type="checkbox" id="checkSenha" />
                    <p>Mostrar Senha</p>
                </MostrarSenha>

                <ButtonsForm>
                    <ButtonEntrarRegistrar type="submit" disabled={true} ref={ElementLogin}>Entrar</ButtonEntrarRegistrar>
                    <EsqueciSenha disabled={true} ref={ElementRecuperarSenha} >Esqueceu a Senha?</EsqueciSenha>
                </ButtonsForm>


                <CadastrarDiv $LoginRegister="buttonCadastrar" >
                    <p>Ainda não possui conta? </p>
                    <Link to="/cadastro"><button className='buttonCadastrar'>Cadastra-se</button></Link>
                </CadastrarDiv>
                
            </div>

        </form>
    </Main>
  )
}

export default Login