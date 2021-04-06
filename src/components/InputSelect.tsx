import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

type OptionProps = {
  label: string
  value: string
}

interface InputSelectProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  options: Array<OptionProps>
  onChangeOption: (option: OptionProps) => void
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  value,
  onChangeOption,
  ...inputProps
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const inputSelectRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputSelectRef.current &&
        !inputSelectRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, inputSelectRef])

  function getSelectedLabel() {
    if (value === undefined || value === null) {
      return options[0].label
    }

    const selectedOption = options.filter(option => option.value === value)[0]

    if (selectedOption) {
      return selectedOption.label
    } else {
      return 'Não encontrado.'
    }
  }

  return (
    <div className="input-select" ref={inputSelectRef}>
      {label && <label>{label}</label>}
      <div
        className="input-container"
        onClick={() => !isOpen && setIsOpen(true)}
      >
        <input {...inputProps} value={getSelectedLabel()} disabled />
        <Icon
          id="icon"
          icon={isOpen ? faCaretUp : faCaretDown}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <ul
        className={
          'options-container ' + (isOpen ? 'options-container-open' : '')
        }
      >
        {options.map((option, key) => {
          return (
            <li
              key={key}
              className={
                getSelectedLabel() === option.label ? 'active-option' : ''
              }
              onClick={() => {
                onChangeOption(option)
                setIsOpen(false)
              }}
            >
              {option.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InputSelect
