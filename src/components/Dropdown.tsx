import React, { ReactNode, useEffect, useState, useRef } from 'react'

type DropdownProps = {
  menu: ReactNode
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({ children, menu, className }) => {
  const [opened, setOpened] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpened(false)
      }
    }

    if (opened) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, opened])

  function toggle() {
    setOpened(!opened)
  }

  return (
    <div ref={dropdownRef} className={'dropdown ' + className}>
      <button className="dropdown-toggle" onClick={toggle}>
        {children}
      </button>
      <div className={'dropdown-menu ' + (opened ? 'dropdown-opened' : '')}>
        {menu}
      </div>
    </div>
  )
}

export default Dropdown
