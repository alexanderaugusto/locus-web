import React, { TextareaHTMLAttributes } from 'react'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const Input: React.FC<InputProps> = ({ label, ...inputAreaProps }) => {
  return (
    <div className="input-area">
      {label && <label>{label}</label>}
      <textarea {...inputAreaProps} />
    </div>
  )
}

export default Input
