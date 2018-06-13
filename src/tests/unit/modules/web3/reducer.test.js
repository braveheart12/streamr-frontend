import assert from 'assert-diff'

import reducer, { initialState } from '../../../../modules/web3/reducer'
import * as constants from '../../../../modules/web3/constants'

describe('web3 - reducer', () => {
    it('has initial state', () => {
        assert.deepEqual(reducer(undefined, {}), initialState)
    })

    it('handles initial account', () => {
        const address = '0x13581255eE2D20e780B0cD3D07fac018241B5E03'
        const expectedState = {
            accountId: address,
            error: null,
            enabled: true,
        }

        assert.deepEqual(reducer(undefined, {
            type: constants.RECEIVE_ACCOUNT,
            payload: {
                id: address,
            },
        }), expectedState)
    })

    it('handles changed account', () => {
        const address = '0x7Ce38183F7851EE6eEB9547B1E537fB362C79C10'
        const expectedState = {
            accountId: address,
            error: null,
            enabled: true,
        }

        assert.deepEqual(reducer(undefined, {
            type: constants.CHANGE_ACCOUNT,
            payload: {
                id: address,
            },
        }), expectedState)
    })

    it('handles failure', () => {
        const error = new Error('Test')

        const expectedState = {
            accountId: null,
            error: {},
            enabled: false,
        }

        assert.deepEqual(reducer(undefined, {
            type: constants.ACCOUNT_ERROR,
            payload: {
                error,
            },
        }), expectedState)
    })
})