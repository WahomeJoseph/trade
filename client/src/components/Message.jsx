/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

export const Message = ({ variant, children }) => {
    const getVariant = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-100 text-green-500'
            case 'error':
                return 'bg-red-100 text-red-500'
            default:
        }
    }
    return (
        <div className='{`p-4 rounded-sm ${getVariantClass}}'>{children}</div>
    )
}

Message.propTypes = {
    variant: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}