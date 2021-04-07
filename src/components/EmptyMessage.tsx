import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Button } from './index'

type ButtonProps = {
  icon: IconDefinition
  title: string
  description: string
  buttonText: string
  redirectTo: string
}

const EmptyMessage: React.FC<ButtonProps> = ({
  icon,
  title,
  description,
  buttonText,
  redirectTo
}) => {
  return (
    <div className="empty-message">
      <Icon id="icon" icon={icon} />
      <h1>{title}</h1>
      <p>{description}</p>
      <Link href={redirectTo}>
        <a>
          <Button>{buttonText}</Button>
        </a>
      </Link>
    </div>
  )
}

export default EmptyMessage
