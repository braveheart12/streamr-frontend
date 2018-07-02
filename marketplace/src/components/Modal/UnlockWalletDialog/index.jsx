// @flow

import React from 'react'
import WalletPng from '../../../../assets/wallet.png'
import WalletPng2x from '../../../../assets/wallet@2x.png'
import Dialog from '../Dialog'
import styles from './unlockwalletdialog.pcss'

export type Props = {
    onCancel: () => void,
    message?: string,
}

const UnlockWalletDialog = ({ onCancel, message, ...props }: Props) => (
    <Dialog
        onClose={onCancel}
        title="Access your wallet"
        {...props}
    >
        <img className={styles.walletIcon} src={WalletPng} srcSet={`${WalletPng2x} 2x`} alt="Wallet Icon" />
        {message && (
            <p>{message}</p>
        )}
    </Dialog>
)

export default UnlockWalletDialog