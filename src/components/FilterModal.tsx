import React, { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, InputCheck } from './index'
import types from '../constants/types'

const FILTER_OPTIONS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3+', value: 3 }
]

type FilterOptionsProps = {
  price: Array<number>
  bedrooms: number
  bathrooms: number
  area: Array<number>
  place: number
  animal: boolean
  type: Array<string>
}

type FilterModalProps = {
  isOpen: boolean
  onToggle: () => void
  applyFilter: (options: FilterOptionsProps) => void
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onToggle,
  applyFilter
}) => {
  const [options, setOptions] = useState<FilterOptionsProps>({
    price: [100, 5000],
    bedrooms: undefined,
    bathrooms: undefined,
    area: [30, 1500],
    place: undefined,
    animal: undefined,
    type: []
  })

  function onChange(type, value) {
    setOptions({ ...options, [type]: value })
  }

  function onCheckBoxChange(type, checked) {
    const propertyType = options.type
    if (checked) {
      if (!propertyType.includes(type)) {
        propertyType.push(type)
        onChange('type', propertyType)
      }
    } else {
      propertyType.splice(propertyType.indexOf(type), 1)
      onChange('type', propertyType)
    }
  }

  function _applyFilter() {
    applyFilter(options)
    onToggle()
  }

  function resetFilter() {
    const defaultOptions = {
      price: [100, 5000],
      bedrooms: undefined,
      bathrooms: undefined,
      area: [30, 1500],
      place: undefined,
      animal: undefined,
      type: []
    }
    setOptions(defaultOptions)
    applyFilter(defaultOptions)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal modal-filter">
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onToggle}>
            <Icon id="icon" icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          <div className="filter-item">
            <h1>Valor</h1>
            <div className="inputs">
              <Input
                type="text"
                label="Mínimo"
                labelInside="R$"
                placeholder="100,00"
                value={options.price[0]}
                onChange={e =>
                  onChange('price', [e.target.value, options.price[1]])
                }
              />
              <Input
                type="text"
                label="Máximo"
                labelInside="R$"
                placeholder="5000,00"
                value={options.price[1]}
                onChange={e =>
                  onChange('price', [options.price[0], e.target.value])
                }
              />
            </div>
          </div>
          <div className="filter-item">
            <h1>Quartos</h1>
            <div className="options">
              <Button
                id="btn-whatever"
                onClick={() => onChange('bedrooms', undefined)}
                className={options.bedrooms === undefined ? 'btn-active' : ''}
              >
                Tanto faz
              </Button>
              {FILTER_OPTIONS.map((option, key) => {
                return (
                  <Button
                    key={key}
                    onClick={() => onChange('bedrooms', option.value)}
                    className={
                      options.bedrooms === option.value ? 'btn-active' : ''
                    }
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="filter-item">
            <h1>Banheiros</h1>
            <div className="options">
              <Button
                id="btn-whatever"
                onClick={() => onChange('bathrooms', undefined)}
                className={options.bathrooms === undefined ? 'btn-active' : ''}
              >
                Tanto faz
              </Button>
              {FILTER_OPTIONS.map((option, key) => {
                return (
                  <Button
                    key={key}
                    onClick={() => onChange('bathrooms', option.value)}
                    className={
                      options.bathrooms === option.value ? 'btn-active' : ''
                    }
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="filter-item">
            <h1>Área</h1>
            <div className="inputs">
              <Input
                type="text"
                label="Mínimo"
                labelInside="m²"
                placeholder="30,00"
                value={options.area[0]}
                onChange={e =>
                  onChange('area', [e.target.value, options.area[1]])
                }
              />
              <Input
                type="text"
                label="Máximo"
                labelInside="m²"
                placeholder="1500,00"
                value={options.area[1]}
                onChange={e =>
                  onChange('area', [options.area[0], e.target.value])
                }
              />
            </div>
          </div>
          <div className="filter-item">
            <h1>Vagas</h1>
            <div className="options">
              <Button
                id="btn-whatever"
                onClick={() => onChange('place', undefined)}
                className={options.place === undefined ? 'btn-active' : ''}
              >
                Tanto faz
              </Button>
              {FILTER_OPTIONS.map((option, key) => {
                return (
                  <Button
                    key={key}
                    onClick={() => onChange('place', option.value)}
                    className={
                      options.place === option.value ? 'btn-active' : ''
                    }
                  >
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="filter-item">
            <h1>Tipo</h1>
            <div className="options options-type">
              {types.map((type, key) => {
                return (
                  <InputCheck
                    key={key}
                    label={type.label}
                    checked={options.type.includes(type.value)}
                    onChange={checked => onCheckBoxChange(type.value, checked)}
                  />
                )
              })}
            </div>
          </div>
          <div className="filter-item">
            <h1>Aceita pets?</h1>
            <div className="options">
              <Button
                id="btn-whatever"
                onClick={() => onChange('animal', undefined)}
                className={options.animal === undefined ? 'btn-active' : ''}
              >
                Tanto faz
              </Button>
              <Button
                id="btn-whatever"
                onClick={() => onChange('animal', true)}
                className={options.animal === true ? 'btn-active' : ''}
              >
                Sim
              </Button>
              <Button
                id="btn-whatever"
                onClick={() => onChange('animal', false)}
                className={options.animal === false ? 'btn-active' : ''}
              >
                Não
              </Button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button id="btn-clean" onClick={resetFilter}>
            Limpar
          </Button>
          <Button id="btn-apply" onClick={_applyFilter}>
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
