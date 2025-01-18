/* eslint-disable no-unused-vars */
import React from 'react'

export const message = ({variant, children}) => {
    const getVariant = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-100 text-green-500'
            case 'error':
                return 'bg-red-100 text-red-500'
            default:
                return 'bg-blue-100 text-blue-500'
        }
    }
    return (
        <div></div>
    )
}