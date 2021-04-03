import React, { InputHTMLAttributes } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconDefinition
  label?: string
}

const Input: React.FC<InputProps> = ({ icon, label, ...inputProps }) => {
  return (
    <div className="input-container">
      {icon && <Icon id="icon" icon={icon} />}
      {label && <label>{label}</label>}
      <input {...inputProps} />
    </div>
  )
}

export default Input
