import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Header, Button, Input } from '../components'
import { useAuth } from '../contexts/auth'

import Logo from '../assets/logo-text.png'

const Login: React.FC = () => {
  const auth = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    await auth
      .signIn(email, password)
      .then(() => {
        router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <Head>
        <title>
          Login - Acesse sua conta para acessar seus imóveis e dados pessoais
        </title>
      </Head>

      <main className="login-page">
        <Header goBack />

        <form className="sign-in" onSubmit={handleLogin}>
          <img src={Logo} alt="IMovel" />
          <Input
            type="email"
            icon={faEnvelope}
            placeholder="Entre com o seu email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            icon={faLock}
            placeholder="Entre com a sua senha"
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Entrar</Button>
          <p>
            Ainda não possui conta?
            <Link href="/signup">
              <a className="logo">Cadastre-se</a>
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Login
