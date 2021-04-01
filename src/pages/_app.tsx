import React from 'react'
import { AppProps } from 'next/app'

import '../styles/global.css'
import '../styles/pages/Home.css'
import '../styles/components/Header.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
