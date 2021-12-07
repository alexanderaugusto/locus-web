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

  const setValue = (e, value) => {
    setFieldValue(value)
    applyFilter({ city: value })
  }

  return (
    <div className="select-input">
      <input
        {...inputProps}
        placeholder={placeholder ?? ''}
        value={fieldValue}
      />
      {iconSearch && <Icon id="icon" icon={iconSearch} />}
      {items && (
        <div className="item-list">
          {items?.map(item => (
            <div
              className="item"
              key={item.city}
              onMouseDown={e => setValue(e, item.city)}
            >
              {`${item.city} - ${item.state}`}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectInput
