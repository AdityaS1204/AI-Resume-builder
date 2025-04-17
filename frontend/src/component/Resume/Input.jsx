import React from 'react'

const Input = ({ label, type, style, placeholder }) => {
    return (
        <div className='flex flex-col gap-1.5 p-2'>
            <label htmlFor={label}>{label}</label>
            <input type={type} placeholder={placeholder} className={style} />
        </div>
    )
}

export default Input