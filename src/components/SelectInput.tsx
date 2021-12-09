import React, { InputHTMLAttributes, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type OptionProps = {
  city: string
}

type Property = {
  city: string
  state: string
}

interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconSearch?: IconDefinition
  placeholder?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: Property[]
  applyFilter?: (options: OptionProps) => void
}

const SelectInput: React.FC<SelectInputProps> = ({
  iconSearch,
  placeholder,
  items,
  applyFilter,
  ...inputProps
}) => {
  const [fieldValue, setFieldValue] = useState('')

  const submitWithEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldCity
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      applyFilter({ city: fieldCity })
    }
  }

  const onChooseElement = fieldValue => {
    setFieldValue(fieldValue)
    applyFilter({ city: fieldValue })
  }

  return (
    <div className="select-input">
      <input
        {...inputProps}
        placeholder={placeholder ?? ''}
        value={fieldValue}
        id="input-search"
        onChange={e => {
          setFieldValue(e.target.value)
        }}
        onKeyPress={e => submitWithEnter(e, fieldValue)}
      />
      {iconSearch && (
        <div className="icon-container">
          <Icon
            className="search-icon"
            icon={iconSearch}
            onClick={() => applyFilter({ city: fieldValue })}
          />
        </div>
      )}
      {items && (
        <div className="item-list">
          {items?.map(
            item =>
              item?.city?.toLowerCase().includes(fieldValue.toLowerCase()) && (
                <div
                  className="item"
                  key={item.city}
                  onMouseDown={() => onChooseElement(item.city)}
                >
                  {`${item.city} - ${item.state}`}
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default SelectInput
