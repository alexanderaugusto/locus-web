import React, { useState } from 'react'
import Head from 'next/head'
import { Header, FilterModal, Input, Button } from '../components'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import Logo from '../assets/logo-black.png'

const Home: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

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
          applyFilter={options => console.log(options)}
        />

        <form className="home-form">
          <img src={Logo} alt="IMovel" />
          <h1>Encontre o imóvel ideal para você!</h1>
          <Input
            // icon={faSearch}
            placeholder="Pesquise por localidade..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
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
      </main>
    </div>
  )
}

export default Home
