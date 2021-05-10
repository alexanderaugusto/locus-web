/* eslint-disable camelcase */
import React from 'react'
import { useRouter } from 'next/router'
import api, { STORAGE_URL } from '../services/api'
import inputValidation from '../utils/inputValidation'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons'

type ImageProps = {
  path: string
  id: number
  property_id: number
}

type PopertyCardProps = {
  property?: {
    id: number
    title: string
    description: string
    street: string
    neighborhood: string
    city: string
    state: string
    country: string
    type: string
    price: number
    bedrooms: number
    bathrooms: number
    area: number
    place: number
    animal: boolean
    favorite?: boolean
    images?: Array<ImageProps>
    owner?: {
      avatar: string
      phone: string
      id: number
      email: string
      name: string
    }
    user_id?: number
  }
}

const PopertyCard: React.FC<PopertyCardProps> = ({ property }) => {
  const router = useRouter()

  const addFavorite = async () => {
    api
      .put(`/user/favorite/${property.id}`, null)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const removeFavorite = async () => {
    api
      .delete(`/user/favorite/${property.id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className="content">
      <div className="scroll-images">
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

      <div className="favorite-container">
        <button
          className="btn-favorite"
          onClick={() => {
            property.favorite || property.favorite === undefined
              ? removeFavorite()
              : addFavorite()
          }}
        >
          <Icon
            id="icon"
            icon={faHeart}
            color={
              property.favorite || property.favorite === undefined
                ? '#F82F4A'
                : '#0565FC'
            }
          />
        </button>
      </div>

      <div className="info-container">
        <p className="price">
          Aluguel {inputValidation.formatCurrency(property.price)}
        </p>

        <p className="address">{`${property.street}, ${property.neighborhood}`}</p>
        <p className="city">{`${property.city} (${property.state})`}</p>

        <a
          className="more-details"
          onClick={() => {
            router.push({
              pathname: '/advertise/details',
              query: { data: JSON.stringify(property) }
            })
          }}
        >
          Mais detalhes
          <Icon id="icon" icon={faArrowAltCircleRight} />
        </a>
      </div>
    </div>
  )
}

export default PopertyCard
