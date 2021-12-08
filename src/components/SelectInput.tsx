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

  return (
    <div className="select-input">
      <input
        {...inputProps}
        placeholder={placeholder ?? ''}
        value={fieldValue}
        onChange={e => {
          setFieldValue(e.target.value)
        }}
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
              item?.city?.includes(fieldValue) && (
                <div
                  className="item"
                  key={item.city}
                  onMouseDown={() => setFieldValue(item.city)}
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
