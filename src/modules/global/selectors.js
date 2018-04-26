// @flow

import { createSelector } from 'reselect'

import type { GlobalState, StoreState } from '../../flowtype/store-state'
import TransactionError from '../../errors/TransactionError'

const selectGlobalState = (state: StoreState): GlobalState => state.global

export const selectDataPerUsd: (StoreState) => ?number = createSelector(
    selectGlobalState,
    (subState: GlobalState): ?number => subState.dataPerUsd,
)

export const selectDataPerUsdError: (StoreState) => ?TransactionError = createSelector(
    selectGlobalState,
    (subState: GlobalState): ?TransactionError => subState.dataPerUsdRateError,
)

export const selectEthereumNetworkIsCorrect: (StoreState) => ?boolean = createSelector(
    selectGlobalState,
    (subState: GlobalState): ?boolean => subState.ethereumNetworkIsCorrect,
)

export const selectEthereumNetworkError: (StoreState) => ?TransactionError = createSelector(
    selectGlobalState,
    (subState: GlobalState): ?TransactionError => subState.ethereumNetworkError,
)