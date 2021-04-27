import React from 'react'
import Head from 'next/head'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import { Header, EmptyMessage } from '../components'

const Favorite: React.FC = () => {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="favorite-page">
        <Header />

        {!auth.signed ? (
          <EmptyMessage
            icon={faHeartBroken}
            title="Você ainda não possui imóveis favoritos!"
            description="Vá para tela principal para visualizar os imóveis e favoritá-los!."
            buttonText="Tela Inicial"
            redirectTo="/"
          />
        ) : (
          <div className="favorite">
            <h1>Meus Favoritos</h1>
          </div>
        )}
      </main>
    </div>
  )
}

export default Favorite
