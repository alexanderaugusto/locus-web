import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { Header, FilterModal, Input, Button, PropertyCard } from '../components'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import api from '../services/api'
import Logo from '../assets/logo-black.png'

const Home: React.FC = () => {
  const auth = useAuth()
  const [properties, setProperties] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchText] = useState('Santa Rita do Sapucaí, MG')

  const getProperties = useCallback(
    async filters => {
      const config = {
        params: filters
      }

      await api
        .get('/properties', config)
        .then(res => {
          setProperties(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    [properties]
  )

  useEffect(() => {
    getProperties({})
  }, [auth.signed])

  return (
    <div>
      <Head>
        <title>IMovel - Nunca foi tão fácil alugar um imóvel</title>
      </Head>

      <main className="home-page">
        <Header />

        <FilterModal
          isOpen={filterOpen}
          onToggle={() => setFilterOpen(false)}
          applyFilter={filters => {
            getProperties(filters)
          }}
        />

        <form className="home-form">
          <img src={Logo} alt="IMovel" />
          <h1>Encontre o imóvel ideal para você!</h1>
          <Input
            iconSearch={faSearch}
            placeholder="Pesquise por localidade..."
            value={searchText}
          />
          <div className="filter">
            <div className="filter-location">
              <p className="filter-title">Imóveis para alugar</p>
              <p className="filter-city">Santa Rita do Sapucaí, MG</p>
            </div>
            <Button
              className="filter-btn"
              type="button"
              onClick={() => {
                setFilterOpen(true)
              }}
            >
              <Icon id="icon" icon={faFilter} />
              Filtrar
            </Button>
          </div>
        </form>
        <div className="properties-grid">
          {properties?.map(property => {
            return (
              <PropertyCard
                key={`${property.id.toString()} - ${property.title}`}
                property={property}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
