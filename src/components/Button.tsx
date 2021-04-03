import React, { ButtonHTMLAttributes } from 'react'

type InputProps = ButtonHTMLAttributes<HTMLButtonElement>

const Input: React.FC<InputProps> = ({ ...buttonProps }) => {
  return <button {...buttonProps} className="button-container" />
}

export default Input
