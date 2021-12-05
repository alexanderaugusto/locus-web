import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import GoogleLogin from 'react-google-login'
import { Header, Button, Input } from '../components'
import { useAuth } from '../contexts/auth'
import { useAlert } from '../contexts/alert'
import { useLoading } from '../contexts/loading'

const Login: React.FC = () => {
  const auth = useAuth()
  const alert = useAlert()
  const { startLoading, stopLoading } = useLoading()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    startLoading()

    await auth
      .signIn(email, password)
      .then(() => {
        const { redirect } = router.query

        if (redirect) {
          router.push(redirect.toString())
        } else {
          router.push('/')
        }
      })
      .catch(err => {
        const type = err.response.status >= 500 ? 'error' : 'warning'
        const title = 'Algo deu errado :('
        const message = err.response?.data.description
        alert.show(type, title, message)
        if (process.env.NODE_ENV !== 'production') {
          console.log(err)
        }
      })

    stopLoading()
  }

  async function handleGoogleLoginSuccess(response) {
    startLoading()

    await auth
      .signInWithGoogle(response.accessToken)
      .then(() => {
        const { redirect } = router.query

        if (redirect) {
          router.push(redirect.toString())
        } else {
          router.push('/')
        }
      })
      .catch(err => {
        const type = err.response.status >= 500 ? 'error' : 'warning'
        const title = 'Algo deu errado :('
        const message = err.response?.data.description
        alert.show(type, title, message)
        if (process.env.NODE_ENV !== 'production') {
          console.log(err)
        }
      })

    stopLoading()
  }

  async function handleGoogleLoginError() {
    const type = 'warning'
    const title = 'Algo deu errado :('
    const message =
      'Um erro ocorreu na autenticação. Por favor, tente novamente!'
    alert.show(type, title, message)
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
          <img src="/logo-blue.png" alt="Locus" />
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
          <Button id="btn-login" type="submit">
            Entrar
          </Button>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
            buttonText="Entrar com Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginError}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <Button
                id="btn-google-login"
                type="submit"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img src="/google-icon.png" alt="Google" />
                Entrar com Google
              </Button>
            )}
          />
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
