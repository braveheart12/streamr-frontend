// @flow

import { connect } from 'react-redux'

import PreviewProductPage from '../../components/PreviewProductPage'
import { selectProduct, selectProductStreams } from '../../modules/createProduct/selectors'
import { createProduct, setImageToUpload } from '../../modules/createProduct/actions'

import type { StoreState } from '../../flowtype/store-state'
import type { Product } from '../../flowtype/product-types'
import type { StreamList } from '../../flowtype/stream-types'

type StateProps = {
    product: ?Product,
    streams: StreamList,
}

type DispatchProps = {
    onSave: () => void,
    setImageToUpload: (File) => void,
}

const mapStateToProps = (state: StoreState): StateProps => ({
    product: selectProduct(state),
    streams: selectProductStreams(state),
})

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    onSave: () => dispatch(createProduct()),
    setImageToUpload: (image: File) => dispatch(setImageToUpload(image)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewProductPage)