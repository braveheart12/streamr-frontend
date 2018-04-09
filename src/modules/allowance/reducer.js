// @flow

import { handleActions } from 'redux-actions'

import {
    GET_ALLOWANCE_REQUEST,
    GET_ALLOWANCE_SUCCESS,
    GET_ALLOWANCE_FAILURE,
    SET_ALLOWANCE_REQUEST,
    SET_ALLOWANCE_SUCCESS,
    SET_ALLOWANCE_FAILURE,
    RECEIVE_SET_ALLOWANCE_HASH,
} from './constants'
import { transactionStates } from '../../utils/constants'
import type { AllowanceState } from '../../flowtype/store-state'
import type { AllowanceAction, HashAction, ReceiptAction, GetAllowanceErrorAction, SetAllowanceErrorAction } from './types'

const initialState: AllowanceState = {
    hash: null,
    allowance: 0,
    pendingAllowance: 0,
    gettingAllowance: false,
    settingAllowance: false,
    receipt: null,
    getError: null,
    setError: null,
    transactionState: null,
}

const reducer: (AllowanceState) => AllowanceState = handleActions({
    [GET_ALLOWANCE_REQUEST]: (state: AllowanceState) => ({
        ...state,
        gettingAllowance: true,
    }),

    [GET_ALLOWANCE_SUCCESS]: (state: AllowanceState, action: AllowanceAction) => ({
        ...state,
        gettingAllowance: false,
        allowance: action.payload.allowance,
    }),

    [GET_ALLOWANCE_FAILURE]: (state: AllowanceState, action: GetAllowanceErrorAction) => ({
        ...state,
        gettingAllowance: false,
        getError: action.payload.error,
    }),

    [SET_ALLOWANCE_REQUEST]: (state: AllowanceState, action: AllowanceAction) => ({
        ...state,
        hash: null,
        receipt: null,
        settingAllowance: true,
        setError: null,
        pendingAllowance: action.payload.allowance,
        transactionState: transactionStates.STARTED,
    }),

    [RECEIVE_SET_ALLOWANCE_HASH]: (state: AllowanceState, action: HashAction) => ({
        ...state,
        hash: action.payload.hash,
        transactionState: transactionStates.HASH_RECEIVED,
    }),

    [SET_ALLOWANCE_SUCCESS]: (state: AllowanceState, action: ReceiptAction) => ({
        ...state,
        receipt: action.payload.receipt,
        settingAllowance: false,
        allowance: state.pendingAllowance,
        pendingAllowance: 0,
        transactionState: transactionStates.MINED,
    }),

    [SET_ALLOWANCE_FAILURE]: (state: AllowanceState, action: SetAllowanceErrorAction) => ({
        ...state,
        setError: action.payload.error,
        settingAllowance: false,
        pendingAllowance: 0,
        transactionState: transactionStates.FAILED,
    }),
}, initialState)

export default reducer