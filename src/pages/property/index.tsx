import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Header, EmptyMessage } from '../../components'
import { faHouseDamage } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/auth'
import { useAlert } from '../../contexts/alert'
import { useLoading } from '../../contexts/loading'
import api, { STORAGE_URL } from '../../services/api'
import inputValidation from '../../utils/inputValidation'

const Advertise: React.FC = () => {
  const auth = useAuth()
  const alert = useAlert()
  const { startLoading, stopLoading } = useLoading()
  const [properties, setProperties] = useState([])
  const [isPropertySelected, setIsPropertySelected] = useState(false)
  const [selected, setSelected] = useState({
    id: '',
    title: '',
    description: '',
    street: '',
    neighborhood: '',
    city: '',
    state: 'MG',
    country: 'Brasil',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    place: '',
    animal: 'true',
    type: 'Casa',
    images: []
  })

  async function getProperties() {
    startLoading()

    await api
      .get('/user/properties')
      .then(res => {
        setProperties(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    stopLoading()
  }

  const removeProperty = async item => {
    api
      .delete(`/property/${item.id}`)
      .then(() => {
        const title = 'Sucesso :)'
        const message = 'Propriedade apagada com sucesso!'
        alert.show('success', title, message)

        getProperties()
      })
      .catch(err => {
        const type = err.response.status >= 500 ? 'error' : 'warning'
        const title = 'Algo deu errado :('
        const message = err.response?.data.description
        alert.show(type, title, message)
        console.error(err)
      })
  }

  const selectItem = item => {
    if (selected.id === item.id) {
      setSelected({
        id: '',
        title: '',
        description: '',
        street: '',
        neighborhood: '',
        city: '',
        state: 'MG',
        country: 'Brasil',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        place: '',
        animal: 'true',
        type: 'Casa',
        images: []
      })
      setIsPropertySelected(false)
    } else {
      setSelected(item)
      setIsPropertySelected(true)
    }
  }

  const isSelected = item => selected.id === item.id

  useEffect(() => {
    if (auth.signed) {
      getProperties()
    }
  }, [auth.signed])

  useEffect(() => {
    setSelected({
      id: '',
      title: '',
      description: '',
      street: '',
      neighborhood: '',
      city: '',
      state: 'MG',
      country: 'Brasil',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      place: '',
      animal: 'true',
      type: 'Casa',
      images: []
    })
    setIsPropertySelected(false)
  }, [])

  return (
    <div>
      <Head>
        <title>Meus anuncios</title>
      </Head>

      <main className="advertise-page">
        <Header />
        {!auth.signed || !properties.length ? (
          <EmptyMessage
            icon={faHouseDamage}
            title="Você não possui nenhum imóvel!!"
            description="Para cadastrar o seu primeiro imóvel, clique no botão abaixo."
            buttonText="Meu primeiro imóvel"
            redirectTo={auth.signed ? '/property/new' : '/login'}
          />
        ) : (
          <div className="advertise">
            <div className="title">
              <h1>Anunciar</h1>
              {isPropertySelected && (
                <a
                  className="delete-btn"
                  onClick={() => removeProperty(selected)}
                >
                  <Button>Excluir</Button>
                </a>
              )}
              <Link href="/property/new">
                <a>
                  <Button>Anunciar</Button>
                </a>
              </Link>
            </div>
            <div className="properties-grid">
              {properties?.map(property => {
                return (
                  <a
                    onClick={() => selectItem(property)}
                    key={`${property.id.toString()} - ${property.title}`}
                  >
                    <div
                      className={'properties-content'}
                      style={{
                        backgroundColor: isSelected(property)
                          ? 'rgba(5, 101, 252, 0.3)'
                          : '#FFF'
                      }}
                    >
                      <div className="image-container">
                        <img
                          sizes="cover"
                          src={`${STORAGE_URL}/property/${property.images[0]?.path}`}
                          alt="Imagens dos imóveis"
                        />
                      </div>

                      <div className="details-container">
                        <div className="infos-container">
                          <h1>{property.title}</h1>
                          <p>{property.description}</p>
                        </div>
                        <p>{inputValidation.formatCurrency(property.price)}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Advertise
