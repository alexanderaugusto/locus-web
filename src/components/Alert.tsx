import React, { useEffect } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  faInfoCircle,
  faCheckCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

type AlertProps = {
  className?: string
  show: boolean
  type: string
  title: string
  message: string
  toggle: () => void
}

const ICONS = {
  error: faInfoCircle,
  warning: faInfoCircle,
  info: faInfoCircle,
  success: faCheckCircle
}

let timer = null

const Alert: React.FC<AlertProps> = ({
  message,
  show,
  toggle,
  type,
  title
}) => {
  if (!show) {
    return null
  }

  useEffect(() => {
    if (show) {
      clearTimeout(timer)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      timer = setTimeout(() => {
        toggle()
        clearTimeout(timer)
      }, 5000)
    }
  }, [show])

  return (
    <div className={'alert alert-' + type}>
      <div className="alert-container">
        <Icon id="alert-icon" icon={ICONS[type]} />
        <div className="text">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
        <button onClick={toggle}>
          <Icon id="close-icon" icon={faTimes} />
        </button>
      </div>
    </div>
  )
}

export default Alert
