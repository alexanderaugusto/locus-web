import React, { createContext, useContext, useState } from 'react'
import { PageLoader } from '../components'

type LoadingContextProps = {
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextProps>(
  {} as LoadingContextProps
)

export const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoadng] = useState(true)

  const startLoading = () => setLoadng(true)

  const stopLoading = () => setLoadng(false)

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      <PageLoader loading={loading} />
      {children}
    </LoadingContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLoading() {
  return useContext(LoadingContext)
}
