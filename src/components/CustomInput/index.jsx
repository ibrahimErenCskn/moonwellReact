import React from 'react'
import classnames from 'classnames'

export default function CustomInput({ placeholder, handleChange, handleValue, handleType }) {
    return (
        <input value={handleValue} onChange={handleChange} type={handleType ? handleType : "text"} placeholder={placeholder} className={
            classnames(
                {
                    'w-96 h-[36px] border-[1px] px-2 border-[rgba(0,0,0,0.1)]': true,
                })} />
    )
}
