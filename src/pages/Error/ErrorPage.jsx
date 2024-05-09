import React from 'react'
import ImageError  from '../../../public/ErrorImage.svg'
import {MainError} from './styleError'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <MainError>
      <img src={ImageError} alt="" />
      <p>Este endereço não foi encontrado, Por favor retorne a tela de login!</p>
      <Link to="/" > Fazer Login</Link>
    </MainError>
  )
}

export default ErrorPage