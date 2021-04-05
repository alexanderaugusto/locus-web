import React from 'react'
import Head from 'next/head'
import { Header } from '../components'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>IMovel - Nunca foi tão fácil alugar um imóvel</title>
      </Head>

      <main>
        <Header />
      </main>
    </div>
  )
}

export default Home
