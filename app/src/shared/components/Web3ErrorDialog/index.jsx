// @flow

import React from 'react'

import GenericErrorDialog from './GenericErrorDialog'
import Web3NotDetectedDialog from './Web3NotDetectedDialog'

import { Web3NotSupportedError } from '$shared/errors/Web3'

export type Props = {
    onClose: () => void,
    waiting: boolean,
    error: ?Error,
}

const Web3ErrorDialog = ({ error, ...props }: Props) => {
    if (error instanceof Web3NotSupportedError) {
        return <Web3NotDetectedDialog {...props} />
    }

    return (
        <GenericErrorDialog {...props}>
            {(error && error.message) || 'Error'}
        </GenericErrorDialog>
    )
}

export default Web3ErrorDialog