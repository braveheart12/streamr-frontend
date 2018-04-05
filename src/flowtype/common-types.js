// @flow

import { currencies, priceUnits } from '../utils/constants'

export type Currency = $Keys<typeof currencies>

export type PriceUnit = $Keys<typeof priceUnits>

declare class process {
    static env: {
        MARKETPLACE_API_URL: string
    }
}

export type ErrorFromApi = {
    message: string,
    code?: string
}

export type ErrorInUi = {
    message: string,
    statusCode?: ?number,
    code?: ?string
}

export type ReduxAction = {
    type: string,
}

export type ReduxActionCreator = () => ReduxAction

export type PayloadAction<P> = ReduxAction & {
    payload: P,
}

export type ApiResult = Promise<any>

export type RequestMethod = 'get' | 'post' | 'put' | 'delete'
