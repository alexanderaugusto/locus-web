import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={'button-container ' + buttonProps.className}
    />
  )
}

export default Button
