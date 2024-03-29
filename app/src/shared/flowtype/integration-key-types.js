// @flow

import type { Address } from './web3-types'

export type IntegrationKeyId = string

export type IntegrationKey = {
    id: IntegrationKeyId,
    name: string,
    service: string,
    json: {
        address?: ?Address,
    },
}

export type IntegrationKeyIdList = Array<IntegrationKeyId>

export type IntegrationKeyList = Array<IntegrationKey>

export type IntegrationKeyEntities = {
    [IntegrationKeyId]: IntegrationKey,
}

export type Challenge = {
    challenge: string,
    expires: Date,
    id: string,
}
