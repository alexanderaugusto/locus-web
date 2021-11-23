import React from 'react'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'
import { AlertProvider } from '../contexts/alert'

import '../styles/global.css'
import '../styles/pages/Home.css'
import '../styles/pages/HomeMedia.css'
import '../styles/pages/Login.css'
import '../styles/pages/SignUp.css'
import '../styles/pages/Advertise.css'
import '../styles/pages/AdvertiseDetails.css'
import '../styles/pages/AdvertiseMedia.css'
import '../styles/pages/NewAdvertise.css'
import '../styles/pages/NewAdvertiseMedia.css'
import '../styles/pages/Account.css'
import '../styles/pages/Favorite.css'
import '../styles/pages/FavoriteMedia.css'
import '../styles/components/Alert.css'
import '../styles/components/Button.css'
import '../styles/components/Dropdown.css'
import '../styles/components/EmptyMessage.css'
import '../styles/components/FilterModal.css'
import '../styles/components/Header.css'
import '../styles/components/Input.css'
import '../styles/components/SelectInput.css'
import '../styles/components/InputArea.css'
import '../styles/components/InputCheck.css'
import '../styles/components/InputSelect.css'
import '../styles/components/PropertyCard.css'
import '../styles/components/PropertyCardMedia.css'
import '../styles/components/StepProgress.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AlertProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AlertProvider>
  )
}

export default MyApp
