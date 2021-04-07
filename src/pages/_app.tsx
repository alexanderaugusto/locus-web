import React from 'react'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'

import '../styles/global.css'
import '../styles/pages/Home.css'
import '../styles/pages/Login.css'
import '../styles/pages/SignUp.css'
import '../styles/pages/Advertise.css'
import '../styles/pages/NewAdvertise.css'
import '../styles/components/Button.css'
import '../styles/components/Dropdown.css'
import '../styles/components/FilterModal.css'
import '../styles/components/Header.css'
import '../styles/components/Input.css'
import '../styles/components/InputArea.css'
import '../styles/components/InputCheck.css'
import '../styles/components/InputSelect.css'
import '../styles/components/StepProgress.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
