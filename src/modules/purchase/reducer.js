// @flow

import { handleActions } from 'redux-actions'

import {
    BUY_PRODUCT_REQUEST,
    BUY_PRODUCT_SUCCESS,
    BUY_PRODUCT_FAILURE,
    RECEIVE_PURCHASE_HASH,
} from './constants'
import type { PurchaseState } from '../../flowtype/store-state'
import { transactionStates } from '../../utils/constants'
import type { PurchaseAction, HashAction, ReceiptAction, PurchaseErrorAction } from './types'

const initialState: PurchaseState = {
    hash: null,
    productId: null,
    receipt: null,
    processing: false,
    error: null,
    transactionState: null,
}

const reducer: (PurchaseState) => PurchaseState = handleActions({
    [BUY_PRODUCT_REQUEST]: (state: PurchaseState, action: PurchaseAction) => ({
        ...state,
        hash: null,
        productId: action.payload.productId,
        receipt: null,
        processing: true,
        error: null,
        transactionState: transactionStates.STARTED,
    }),

    [RECEIVE_PURCHASE_HASH]: (state: PurchaseState, action: HashAction) => ({
        ...state,
        hash: action.payload.hash,
        transactionState: transactionStates.HASH_RECEIVED,
    }),

    [BUY_PRODUCT_SUCCESS]: (state: PurchaseState, action: ReceiptAction) => ({
        ...state,
        receipt: action.payload.receipt,
        processing: false,
        transactionState: transactionStates.MINED,
    }),

    [BUY_PRODUCT_FAILURE]: (state: PurchaseState, action: PurchaseErrorAction) => ({
        ...state,
        error: action.payload.error,
        processing: false,
        transactionState: transactionStates.FAILED,
    }),
}, initialState)

export default reducer