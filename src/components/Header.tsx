import React, { useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/auth'
import { STORAGE_URL } from '../services/api'

import Logo from '../assets/logo-text-horizontal.png'

const Header: React.FC = () => {
  const auth = useAuth()

  return (
    <div className="header">
      <Link href="/">
        <img className="logo" src={Logo} alt="IMovel" />
      </Link>
      {auth.signed ? (
        <button className="btn-user">
          <img
            src={`${STORAGE_URL}/user/${auth.user.avatar}`}
            alt="Sua imagem"
          />
        </button>
      ) : (
        <button className="btn-user">
          <Icon id="icon" icon={faUserAlt} />
        </button>
      )}
    </div>
  )
}

export default Header
