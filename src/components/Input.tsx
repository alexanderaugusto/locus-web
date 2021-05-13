import React, { InputHTMLAttributes } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconDefinition
  iconSearch?: IconDefinition
  label?: string
  labelInside?: string
}

const Input: React.FC<InputProps> = ({
  icon,
  iconSearch,
  label,
  labelInside,
  ...inputProps
}) => {
  return (
    <div className="input">
      {label && <label>{label}</label>}
      <div className="input-container">
        {icon && <Icon id="icon" icon={icon} />}
        {labelInside && <label>{labelInside}</label>}
        <input {...inputProps} autoComplete="new-password" />
        {iconSearch && <Icon id="icon" icon={iconSearch} />}
      </div>
    </div>
  )
}

export default Input
