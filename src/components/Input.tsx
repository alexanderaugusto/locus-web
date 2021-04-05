import React, { InputHTMLAttributes } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconDefinition
  label?: string
  labelInside?: boolean
}

const Input: React.FC<InputProps> = ({
  icon,
  label,
  labelInside,
  ...inputProps
}) => {
  return (
    <div className="input">
      {label && !labelInside && <label>{label}</label>}
      <div className="input-container">
        {icon && <Icon id="icon" icon={icon} />}
        {label && labelInside && <label>{label}</label>}
        <input {...inputProps} autoComplete="new-password" />
      </div>
    </div>
  )
}

export default Input
