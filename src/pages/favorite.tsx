import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import { Header, EmptyMessage } from '../components'
import api, { STORAGE_URL } from '../services/api'

const Favorite: React.FC = () => {
  const auth = useAuth()
  const [favorites, setFavorites] = useState([])

  // const getFavorites = async () => {
  //   await api
  //     .get('/user/favorites')
  //     .then(res => {
  //       // setFavorites(res.data)
  //       setFavorites([])
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

  // useEffect(() => {
  //   if (auth.signed) {
  //     getFavorites()
  //   }
  // }, [auth.signed])

  return (
    <div>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="favorite-page">
        <Header />

        {!auth.signed || !favorites.length ? (
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
