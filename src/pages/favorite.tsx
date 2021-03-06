import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import { useLoading } from '../contexts/loading'
import { Header, EmptyMessage, PropertyCard } from '../components'
import api from '../services/api'

const Favorite: React.FC = () => {
  const auth = useAuth()
  const { startLoading, stopLoading } = useLoading()
  const [favorites, setFavorites] = useState([])

  const getFavorites = useCallback(async () => {
    startLoading()

    await api
      .get('/user/favorites')
      .then(res => {
        setFavorites(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    stopLoading()
  }, [favorites])

  const onChangeFavorite = () => {
    getFavorites()
  }

  useEffect(() => {
    if (auth.signed) {
      getFavorites()
    }
  }, [auth.signed])

  return (
    <div>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="favorite-page">
        <Header />

        {!auth.signed || !favorites?.length ? (
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
            <div className="properties-grid">
              {favorites?.map(favorite => {
                return (
                  <PropertyCard
                    key={`${favorite.id.toString()} - ${favorite.title}`}
                    property={favorite}
                    onChangeFavorite={onChangeFavorite}
                  />
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Favorite
