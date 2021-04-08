import React, { createContext, useContext, useState } from 'react'
import { Alert } from '../components'

type AlertContextProps = {
  show: (type: string, title: string, message: string) => void
}

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps)

export const AlertProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    type: 'error',
    title: '',
    message: ''
  })

  function show(type: string, title: string, message: string) {
    setAlert({
      ...alert,
      show: true,
      type,
      title,
      message
    })
  }

  function toggle() {
    setAlert({ show: false, type: 'error', title: '', message: '' })
  }

  return (
    <AlertContext.Provider value={{ show }}>
      <Alert
        show={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        toggle={toggle}
      />
      {children}
    </AlertContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAlert() {
  return useContext(AlertContext)
}
