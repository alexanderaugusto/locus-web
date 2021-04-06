import React, { TextareaHTMLAttributes } from 'react'

interface InputAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const InputArea: React.FC<InputAreaProps> = ({ label, ...inputAreaProps }) => {
  return (
    <div className="input-area">
      {label && <label>{label}</label>}
      <textarea {...inputAreaProps} />
    </div>
  )
}

export default InputArea
