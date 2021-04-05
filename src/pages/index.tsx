import React from 'react'
import Head from 'next/head'
import { Header, StepProgress } from '../components'

const Home: React.FC = () => {
  function step1() {
    return <p>Step 1</p>
  }

  function step2() {
    return <p>Step 2</p>
  }

  function step3() {
    return <p>Step 3</p>
  }

  function step4() {
    return <p>Step 4</p>
  }

  return (
    <div>
      <Head>
        <title>IMovel - Nunca foi tão fácil alugar um imóvel</title>
      </Head>

      <main>
        <Header />

        <StepProgress
          steps={[
            {
              label: 'Pessoal',
              content: step1
            },
            {
              label: 'Login',
              content: step2
            },
            {
              label: 'Senha',
              content: step3
            },
            {
              label: 'Foto',
              content: step4
            }
          ]}
          initialStep={0}
          onSubmit={() => console.log('Submit')}
        />
      </main>
    </div>
  )
}

export default Home
