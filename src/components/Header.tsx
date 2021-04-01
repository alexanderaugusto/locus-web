import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

import Logo from '../assets/logo-text-horizontal.png'

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src={Logo} alt="IMovel" />
      <Icon id="icon" icon={faUserAlt} />
    </div>
  )
}

export default Header
