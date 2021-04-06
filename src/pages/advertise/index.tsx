import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Header } from '../../components'

const Advertise: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Meus anuncios</title>
      </Head>

      <main className="advertise-page">
        <Header />

        <div className="advertise">
          <div className="title">
            <h1>Anunciar</h1>
            <Link href="/advertise/new">
              <a>
                <Button>Novo anuncio</Button>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Advertise
