import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

type InputCheckProps = {
  checked: boolean
  label?: string
  onChange: (checked: boolean) => void
}

const InputCheck: React.FC<InputCheckProps> = ({
  checked,
  label,
  onChange
}) => {
  return (
    <div className="input-check">
      <div className="input-container" onClick={() => onChange(!checked)}>
        {checked && <Icon id="icon" icon={faCheck} />}
      </div>
      {label && <label>{label}</label>}
    </div>
  )
}

export default InputCheck
