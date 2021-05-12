/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import api, { STORAGE_URL } from '../../services/api'
import { Header, InputArea, Button } from '../../components'
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

type PropertyProps = {
  id: number
  title: string
  description: string
  street: string
  neighborhood: string
  city: string
  state: string
  bedrooms: number
  bathrooms: number
  area: number
  animal: boolean
  price: number
  images: Array<PropertyImageProps>
  owner: UserProps
}

const AdvertiseDetails: React.FC = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [property, setProperty] = useState<PropertyProps>(null)
  const { id: property_id } = router.query

  const getProperty = useCallback(async () => {
    await api
      .get(`/user/property/${property_id}`)
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
      .post(`/user/property/${router.query?.id}/owner/contact`, data)
      .then(() => {
        console.log('ENVIOU')
      })
      .catch(err => {
        console.error(err)
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
            <p className="address">{`${property?.street}, ${property?.neighborhood} - ${property?.city} (${property?.state})`}</p>

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
                    {property?.street}, {property?.neighborhood} <br />{' '}
                    {property?.city} ({property?.state})
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
              <Button className="contact-btn" onClick={handleContact}>
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