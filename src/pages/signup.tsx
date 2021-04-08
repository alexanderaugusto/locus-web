import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Dropzone from 'react-dropzone'
import { useAlert } from '../contexts/alert'
import api, { STORAGE_URL } from '../services/api'
import { Header, Input, StepProgress } from '../components'
import inputValidation from '../utils/inputValidation'

const SignUp: React.FC = () => {
  const alert = useAlert()
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: null
  })

  function onChange(type: string, value: string) {
    setData({ ...data, [type]: value })
  }

  function onChangeAvatar(file) {
    const avatar = file
    avatar.preview = URL.createObjectURL(file)
    setData({ ...data, avatar })
  }

  async function onSubmit() {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('name', data.name)
    formData.append('cpf', data.cpf)
    formData.append('phone', data.phone)
    if (data.avatar !== null) {
      formData.append('file', data.avatar)
    }

    await api
      .post('/user', formData, config)
      .then(() => {
        router.push('/login')
      })
      .catch(err => {
        const type = err.response.status >= 500 ? 'error' : 'warning'
        const title = 'Algo deu errado :('
        const message = err.response?.data.message
        alert.show(type, title, message)
        if (process.env.NODE_ENV !== 'production') {
          console.log(err)
        }
      })
  }

  function step1() {
    return (
      <div className="personal-step">
        <Input
          type="text"
          label="Nome"
          placeholder="Ex: Alexander Augusto"
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
        />

        <Input
          type="text"
          label="CPF"
          placeholder="xxx.xxx.xxx-xx"
          value={data.cpf}
          onChange={e => onChange('cpf', inputValidation.cpf(e.target.value))}
        />

        <Input
          type="text"
          label="Celular"
          placeholder="(xx) xxxxx-xxxx"
          value={data.phone}
          onChange={e =>
            onChange('phone', inputValidation.phone(e.target.value))
          }
        />
      </div>
    )
  }

  function step2() {
    return (
      <div className="login-step">
        <Input
          type="email"
          label="E-mail"
          placeholder="Ex: alexander@imovel.com"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
        />

        <Input
          type="email"
          label="Confirmar e-mail"
          placeholder="Ex: alexander@imovel.com"
          value={data.confirmEmail}
          onChange={e => onChange('confirmEmail', e.target.value)}
        />
      </div>
    )
  }

  function step3() {
    return (
      <div className="password-step">
        <h2>
          Para sua segurança, a senha deve ter no mínimo 8 caracteres, com
          números, letra maiúscula e minúscula e caracteres especiais.
        </h2>
        <Input
          type="password"
          label="Senha"
          placeholder="••••••••••••••••"
          value={data.password}
          onChange={e => onChange('password', e.target.value)}
        />

        <Input
          type="password"
          label="Confirmar senha"
          placeholder="••••••••••••••••"
          value={data.confirmPassword}
          onChange={e => onChange('confirmPassword', e.target.value)}
        />
      </div>
    )
  }

  function step4() {
    return (
      <div className="photo-step">
        <Dropzone onDrop={acceptedFiles => onChangeAvatar(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="avatar-upload">
                <img
                  src={
                    data.avatar?.preview ||
                    `${STORAGE_URL}/user/default-avatar.png`
                  }
                  alt="Imagem do usuário"
                />
                <p>Alterar</p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Cadastrar - Vamos cadastrar sua conta IMovel</title>
      </Head>

      <main className="signup-page">
        <Header goBack />

        <div className="sign-up">
          <h1>É rápido, simples e gratuito!</h1>

          <StepProgress
            steps={[
              {
                label: 'Pessoal',
                content: step1
              },
              {
                label: 'Login',
                content: step2
              },
              {
                label: 'Senha',
                content: step3
              },
              {
                label: 'Foto',
                content: step4
              }
            ]}
            initialStep={0}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </div>
  )
}

export default SignUp
