/* eslint-disable camelcase */
import React from 'react'
import { STORAGE_URL } from '../services/api'
import inputValidation from '../utils/inputValidation'

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
    images: Array<ImageProps>
  }
}

const PopertyCard: React.FC<PopertyCardProps> = ({ property }) => {
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

      <div className="info-container">
        <p className="price">
          Aluguel {inputValidation.formatCurrency(property.price)}
        </p>

        <p className="address">{`${property.street}, ${property.neighborhood}`}</p>
        <p className="city">{`${property.city} (${property.state})`}</p>
      </div>
    </div>
  )
}

export default PopertyCard
