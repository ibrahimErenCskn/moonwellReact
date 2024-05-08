import React from 'react'

export default function CustomButton({ text }) {
    return (
        <button type='submit' className='w-96 h-12 bg-[#2cabe3] border-2 text-xl text-white'>{text}</button>
    )
}
