import React from 'react'

export default function FormInputs({
  title, name, id, value, onChange,
}) {
  
  return (
    <div className="form-inputs">
      <label htmlFor="rest">{title}:</label>
      <input type="text" className="shorter" name={name} id={id} value={value} onChange={onChange} />
    </div>
  )
}
