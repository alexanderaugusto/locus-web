import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Dropzone from 'react-dropzone'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import api, { STORAGE_URL } from '../services/api'
import inputValidation from '../utils/inputValidation'
import { Button, Header, Input, EmptyMessage } from '../components'

const Account: React.FC = () => {
  const auth = useAuth()
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: `${STORAGE_URL}/user/default-avatar.png`
  })

  async function getUser() {
    await api
      .get('/user')
      .then(res => {
        setUser({
          ...res.data,
          avatar: `${STORAGE_URL}/user/${res.data.avatar}`
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  function onChange(type: string, value: string) {
    setUser({ ...user, [type]: value })
  }

  async function saveData(e) {
    e.preventDefault()

    const data = {
      name: user.name,
      phone: user.phone
    }

    await api.put('/user', data).catch(err => {
      console.error(err)
    })
  }

  async function updateAvatar(image) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const data = new FormData()

    data.append('file', image)

    setUser({
      ...user,
      avatar: URL.createObjectURL(image)
    })

    await api.put('/user/avatar', data, config).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    if (auth.signed) {
      getUser()
    }
  }, [auth.signed])

  return (
    <div>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="account-page">
        <Header />

        {!auth.signed ? (
          <EmptyMessage
            icon={faUserAlt}
            title="Você ainda não está logado em uma conta!"
            description="Faça o login no aplicativo para poder acessar os dados da sua conta."
            buttonText="Entrar"
            redirectTo="/login"
          />
        ) : (
          <div className="account">
            <h1>Minha conta</h1>

            <div className="user-info">
              <Dropzone
                onDrop={acceptedFiles => updateAvatar(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={user.avatar} alt="Avatar" />
                  </div>
                )}
              </Dropzone>
              <p>{user.name}</p>
              <Button onClick={() => auth.signOut()}>Sair</Button>
            </div>

            <form onSubmit={saveData}>
              <Input
                type="text"
                labelInside="Nome"
                placeholder="Ex: Alexander Augusto"
                value={user.name}
                onChange={e => onChange('name', e.target.value)}
              />
              <Input
                type="email"
                labelInside="E-mail"
                placeholder="Ex: alexander@imovel.com"
                value={user.email}
                onChange={e => onChange('email', e.target.value)}
              />
              <Input
                type="text"
                labelInside="Celular"
                placeholder="(xx) xxxxx-xxxx"
                value={user.phone}
                onChange={e =>
                  onChange('phone', inputValidation.phone(e.target.value))
                }
              />
              <Button type="submit">Salvar</Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

export default Account
