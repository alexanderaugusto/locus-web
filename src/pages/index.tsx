import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import {
  Header,
  FilterModal,
  Button,
  PropertyCard,
  SelectInput
} from '../components'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import api from '../services/api'

const Home: React.FC = () => {
  const auth = useAuth()
  const [properties, setProperties] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)

  const [cities, setCities] = useState([
    {
      city: 'No cities available',
      state: ''
    }
  ])

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

  const getItems = async () => {
    await api
      .get('/cities')
      .then(res => {
        setCities(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    return []
  }

  const onChangeFavorite = () => {
    getProperties({})
  }

  useEffect(() => {
    getProperties({})
    getItems()
  }, [auth.signed])

  return (
    <div>
      <Head>
        <title>Locus - Nunca foi tão fácil alugar um imóvel</title>
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
          <img src="/logo-black-mini.png" alt="Locus" />
          <h1>Encontre o imóvel ideal para você!</h1>
          <SelectInput
            iconSearch={faSearch}
            placeholder="Pesquise por localidade..."
            items={cities}
            readOnly={true}
            applyFilter={filters => {
              getProperties(filters)
            }}
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
                onChangeFavorite={onChangeFavorite}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
