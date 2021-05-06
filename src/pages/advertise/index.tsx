import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Header, EmptyMessage } from '../../components'
import { faHouseDamage } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/auth'
import api from '../../services/api'

const Advertise: React.FC = () => {
  const auth = useAuth()
  const [properties, setProperties] = useState([])

  // async function getProperties() {
  //   await api
  //     .get('/user/properties')
  //     .then(res => {
  //       setProperties(res.data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

  // useEffect(() => {
  //   if (auth.signed) {
  //     getProperties()
  //   }
  // }, [auth.signed])

  return (
    <div>
      <Head>
        <title>Meus anuncios</title>
      </Head>

      <main className="advertise-page">
        <Header />
        {!auth.signed || !properties.length ? (
          <EmptyMessage
            icon={faHouseDamage}
            title="Você não possui nenhum imóvel!!"
            description="Para cadastrar o seu primeiro imóvel, clique no botão abaixo."
            buttonText="Meu primeiro imóvel"
            redirectTo="/advertise/new" /// {auth.signed ? '/advertise/new' : '/login'}
          />
        ) : (
          <div className="advertise">
            <div className="title">
              <h1>Anunciar</h1>
              <Link href="/advertise/new">
                <a>
                  <Button>Anunciar</Button>
                </a>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Advertise
