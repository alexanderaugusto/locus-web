/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import api, { STORAGE_URL } from '../../services/api'
import { Header, InputArea, Button } from '../../components'
import { useAuth } from '../../contexts/auth'
import { useAlert } from '../../contexts/alert'
import inputValidation from '../../utils/inputValidation'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faBath,
  faRulerHorizontal,
  faDog,
  faEnvelope,
  faPhone,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons'

type PropertyImageProps = {
  id: number
  path: string
}

type UserProps = {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
}

type AddressProps = {
  street: string
  neighborhood: string
  city: string
  state: string
}

type PropertyProps = {
  id: number
  title: string
  description: string
  bedrooms: number
  bathrooms: number
  area: number
  animal: boolean
  price: number
  images: Array<PropertyImageProps>
  owner: UserProps
  address: AddressProps
}

const AdvertiseDetails: React.FC = () => {
  const auth = useAuth()
  const alert = useAlert()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [property, setProperty] = useState<PropertyProps>(null)
  const { id: property_id } = router.query

  const getProperty = useCallback(async () => {
    await api
      .get(`/property/${property_id}`)
      .then(res => {
        setProperty(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [property_id])

  useEffect(() => {
    if (property_id) {
      getProperty()
    }
  }, [property_id, getProperty])

  const handleContact = async () => {
    const data = {
      message
    }

    await api
      .post(`/property/${router.query?.id}/owner/contact`, data)
      .then(() => {
        const type = 'success'
        const title = 'Deu tudo certo :D'
        const message = 'Um e-mail foi enviado ao dono do imóvel.'
        alert.show(type, title, message)
      })
      .catch(err => {
        console.error(err)
        const type = err.response.status >= 500 ? 'error' : 'warning'
        const title = 'Algo deu errado :('
        const message = err.response?.data.message
        alert.show(type, title, message)
      })
  }

  if (!property) {
    return null
  }

  return (
    <div>
      <Head>
        <title>Detalhes do Imóvel</title>
      </Head>

      <main className="advertise-details-page">
        <Header goBack />

        <div className="images-section">
          {property.images.map(image => (
            <div key={image.id} className="image">
              <img
                style={{
                  minWidth: property.images.length <= 2 ? '50vw' : 'unset'
                }}
                sizes="cover"
                src={`${STORAGE_URL}/property/${image.path}`}
                alt="Imagens dos imóveis"
              />
            </div>
          ))}
        </div>

        <div className="info-container">
          <div className="info-property">
            <h1 className="title">{property?.title}</h1>
            <p className="address">{`${property?.address.street}, ${property?.address.neighborhood} - ${property?.address.city} (${property?.address.state})`}</p>

            <h1 className="label">Sobre esse imóvel:</h1>
            <p className="description">{property.description}</p>

            <div className="icons-container">
              <div className="icon-info">
                <div className="icon-circle">
                  <Icon id="icon" icon={faBed} />
                </div>
                <p>{property?.bedrooms} quarto(s)</p>
              </div>

              <div className="icon-info">
                <div className="icon-circle">
                  <Icon id="icon" icon={faBath} />
                </div>
                <p>{property?.bathrooms} banheiro(s)</p>
              </div>

              <div className="icon-info">
                <div className="icon-circle">
                  <Icon id="icon" icon={faRulerHorizontal} />
                </div>
                <p>{property?.area} m²</p>
              </div>

              <div className="icon-info">
                <div className="icon-circle">
                  <Icon id="icon" icon={faDog} />
                </div>
                <p>{property?.animal ? 'Aceita pet' : 'Não aceita pet'}</p>
              </div>
            </div>

            <h1 className="label">Aluguel:</h1>
            <p className="price">
              {inputValidation.formatCurrency(Number(property?.price))}
            </p>
          </div>
          <div className="info-owner">
            <div className="owner-container">
              <div className="avatar">
                <img
                  src={`${STORAGE_URL}/user/${property.owner.avatar}`}
                  alt="Avatar"
                />
              </div>
              <ul className="owner-contact">
                <li>
                  <Icon id="icon" icon={faPhone} />
                  <p>{property.owner.phone}</p>
                </li>
                <li>
                  <Icon id="icon" icon={faEnvelope} />
                  <p>{property.owner.email}</p>
                </li>
                <li>
                  <Icon id="icon" icon={faMapMarkedAlt} />
                  <p>
                    {property?.address.street}, {property?.address.neighborhood}{' '}
                    <br /> {property?.address.city} ({property?.address.state})
                  </p>
                </li>
              </ul>
            </div>

            <div className="contact-container">
              <InputArea
                label="Mensagem"
                placeholder="Sua mensagem para o vendedor..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <Button
                className="contact-btn"
                onClick={() => {
                  if (auth.signed) {
                    handleContact()
                  } else {
                    router.push(`/login?redirect=/advertise/${property.id}`)
                  }
                }}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdvertiseDetails
