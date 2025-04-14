import React from 'react'

const Input = ({ label, type, style, placeholder }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input type={type} placeholder={placeholder} className={style} />
        </div>
    )
}

export default Input