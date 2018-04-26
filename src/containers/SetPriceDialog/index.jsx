// @flow

import { connect } from 'react-redux'

import { selectDataPerUsd } from '../../modules/global/selectors'
import SetPriceDialog from '../../components/Modal/SetPriceDialog'

const mapStateToProps = (state) => ({
    dataPerUsd: selectDataPerUsd(state),
})

export default connect(mapStateToProps)(SetPriceDialog)