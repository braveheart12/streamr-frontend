// @flow

import { handleActions } from 'redux-actions'

import {
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
    GET_STREAMS_BY_PRODUCT_ID_REQUEST,
    GET_STREAMS_BY_PRODUCT_ID_SUCCESS,
    GET_STREAMS_BY_PRODUCT_ID_FAILURE,
    GET_PRODUCT_FROM_CONTRACT_FAILURE,
    GET_PRODUCT_FROM_CONTRACT_REQUEST,
    GET_PRODUCT_FROM_CONTRACT_SUCCESS,
} from './constants'
import type { ProductState } from '../../flowtype/store-state'
import type {
    ProductIdAction,
    ProductErrorAction,
    StreamIdsByProductIdAction,
} from './types'

const initialState: ProductState = {
    id: null,
    fetchingProduct: false,
    productError: null,
    streams: [],
    fetchingStreams: false,
    streamsError: null,
    fetchingContractProduct: false,
    contractProductError: null,
}

const reducer: (ProductState) => ProductState = handleActions({
    [GET_PRODUCT_BY_ID_REQUEST]: (state: ProductState, action: ProductIdAction) => ({
        ...state,
        id: action.payload.id,
        fetchingProduct: true,
        productError: null,
    }),

    [GET_PRODUCT_BY_ID_SUCCESS]: (state: ProductState) => ({
        ...state,
        fetchingProduct: false,
    }),

    [GET_PRODUCT_BY_ID_FAILURE]: (state: ProductState, action: ProductErrorAction) => ({
        ...state,
        productError: action.payload.error,
        fetchingProduct: false,
    }),

    [GET_STREAMS_BY_PRODUCT_ID_REQUEST]: (state: ProductState) => ({
        ...state,
        streams: [],
        fetchingStreams: true,
        streamsError: null,
    }),

    [GET_STREAMS_BY_PRODUCT_ID_SUCCESS]: (state: ProductState, action: StreamIdsByProductIdAction) => ({
        ...state,
        streams: action.payload.streams,
        fetchingStreams: false,
    }),

    [GET_STREAMS_BY_PRODUCT_ID_FAILURE]: (state: ProductState, action: ProductErrorAction) => ({
        ...state,
        fetchingStreams: false,
        streamsError: action.payload.error,
    }),

    [GET_PRODUCT_FROM_CONTRACT_REQUEST]: (state: ProductState, action: ProductIdAction) => ({
        ...state,
        id: action.payload.id,
        fetchingContractProduct: true,
        contractProductError: null,
    }),

    [GET_PRODUCT_FROM_CONTRACT_SUCCESS]: (state: ProductState) => ({
        ...state,
        fetchingContractProduct: false,
    }),

    [GET_PRODUCT_FROM_CONTRACT_FAILURE]: (state: ProductState, action: ProductErrorAction) => ({
        ...state,
        fetchingContractProduct: false,
        contractProductError: action.payload.error,
    }),

}, initialState)

export default reducer