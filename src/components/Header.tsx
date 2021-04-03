import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Person, Favorite, Loyalty } from '@material-ui/icons'
import { useAuth } from '../contexts/auth'
import { STORAGE_URL } from '../services/api'
import { Dropdown } from './index'

import Logo from '../assets/logo-text-horizontal.png'

type HeaderProps = {
  goBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ goBack }) => {
  const auth = useAuth()
  const router = useRouter()

  function isPathActive(path) {
    return router.asPath === path
  }

  return (
    <div className="header">
      {!goBack ? (
        <Link href="/">
          <a className="logo">
            <img src={Logo} alt="IMovel" />
          </a>
        </Link>
      ) : (
        <button className="btn-go-back" onClick={() => router.back()}>
          <Icon id="icon" icon={faArrowLeft} />
        </button>
      )}
      {!auth.signed ? (
        <Dropdown
          className="dropdown-not-signed"
          menu={
            <div className="menu-not-signed">
              <Icon id="icon" icon={faUserAlt} />
              <p>Você ainda não está logado em uma conta!</p>
              <Link href="/login">
                <a>Entrar</a>
              </Link>
            </div>
          }
        >
          <Icon id="icon" icon={faUserAlt} />
        </Dropdown>
      ) : (
        <Dropdown
          className="dropdown-signed"
          menu={
            <>
              <div className="user-info">
                <img
                  src={`${STORAGE_URL}/user/${auth.user.avatar}`}
                  alt="Sua imagem"
                />
                <div>
                  <p>{auth.user.name}</p>
                  <button onClick={auth.signOut}>Sair</button>
                </div>
              </div>

              <ul>
                <li className={isPathActive('/account') ? 'active-item' : ''}>
                  <Link href="/account">
                    <a>
                      <Person id="icon" />
                      <p>Minha conta</p>
                    </a>
                  </Link>
                </li>
                <li className={isPathActive('/favorite') ? 'active-item' : ''}>
                  <Link href="/favorite">
                    <a>
                      <Favorite id="icon" />
                      <p>Favoritos</p>
                    </a>
                  </Link>
                </li>
                <li className={isPathActive('/advertise') ? 'active-item' : ''}>
                  <Link href="/advertise">
                    <a>
                      <Loyalty id="icon" />
                      <p>Anunciar</p>
                    </a>
                  </Link>
                </li>
              </ul>
            </>
          }
        >
          <img
            src={`${STORAGE_URL}/user/${auth.user.avatar}`}
            alt="Sua imagem"
          />
        </Dropdown>
      )}
    </div>
  )
}

export default Header
