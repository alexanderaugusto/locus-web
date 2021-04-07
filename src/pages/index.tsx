import React, { useState } from 'react'
import Head from 'next/head'
import { Header, FilterModal } from '../components'

const Home: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(true)

  return (
    <div>
      <Head>
        <title>IMovel - Nunca foi tão fácil alugar um imóvel</title>
      </Head>

      <main>
        <Header />

        <FilterModal
          isOpen={filterOpen}
          onToggle={() => setFilterOpen(false)}
          applyFilter={options => console.log(options)}
        />
      </main>
    </div>
  )
}

export default Home
