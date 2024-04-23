import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Home from './pages/Home.jsx'
import Textos from './components/Textos.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import GlobalStyle from './styles/globalStyle'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login />,
    errorElement:<ErrorPage/>
  },
  {
    path:"/cadastro",
    element:<Cadastro/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/Home",
    element:<Home />,
    errorElement:<ErrorPage/>
  },
  {
    path:"/Home/:id",
    element:<Textos/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <GlobalStyle/>
  </React.StrictMode>,
)
