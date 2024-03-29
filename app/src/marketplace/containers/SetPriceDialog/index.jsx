// @flow

import React from 'react'
import { connect } from 'react-redux'

import Modal from '$shared/components/Modal'
import Dialog, { type OwnProps as Props } from '$mp/components/Modal/SetPriceDialog'
import { selectDataPerUsd } from '$mp/modules/global/selectors'
import withContractProduct from '$mp/containers/WithContractProduct'

const mapStateToProps = (state) => ({
    dataPerUsd: selectDataPerUsd(state),
})

const SetPriceDialog = connect(mapStateToProps)(withContractProduct(Dialog))

export default (props: Props) => (
    <Modal>
        <SetPriceDialog {...props} />
    </Modal>
)
