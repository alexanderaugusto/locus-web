/* eslint-disable camelcase */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth'
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
    address: {
      street: string
      neighborhood: string
      city: string
      state: string
    }
    user_id?: number
  }
  onChangeFavorite: () => void
}

const PopertyCard: React.FC<PopertyCardProps> = ({
  property,
  onChangeFavorite
}) => {
  const auth = useAuth()
  const router = useRouter()

  const addFavorite = async () => {
    property.favorite = true
    api
      .put(`/property/${property.id}/favorite`, null)
      .then(() => {
        if (onChangeFavorite) {
          onChangeFavorite()
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const removeFavorite = async () => {
    property.favorite = false
    api
      .delete(`/property/${property.id}/favorite`)
      .then(() => {
        if (onChangeFavorite) {
          onChangeFavorite()
        }
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
            if (!auth.signed) {
              router.push('/login')
            } else {
              if (property.favorite || property.favorite === undefined) {
                removeFavorite()
              } else {
                addFavorite()
              }
            }
          }}
        >
          <Icon
            id="icon"
            className="heart-icon"
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

        <p className="address">{`${property.address.street}, ${property.address.neighborhood}`}</p>
        <p className="city">{`${property.address.city} (${property.address.state})`}</p>

        <Link href={`/property/${property.id}`}>
          <a className="more-details">
            Mais detalhes
            <Icon id="icon" icon={faArrowAltCircleRight} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PopertyCard
