// @flow

/*
    These are all type
    {
        id: label
    }
 */

// Purchase flow states
export const purchaseFlowSteps = {
    ACCESS_PERIOD: 'accessPeriod',
    RESET_ALLOWANCE: 'resetAllowance',
    ALLOWANCE: 'allowance',
    NO_BALANCE: 'noBalance',
    SUMMARY: 'summary',
    COMPLETE: 'complete',
}

// save product dialog steps
export const saveProductSteps = {
    STARTED: 'start',
    TRANSACTION: 'transaction',
    SAVE: 'save',
}

// Publish flow states
export const publishFlowSteps = {
    CONFIRM: 'confirm',
    CREATE_CONTRACT_PRODUCT: 'createContractProduct',
    PUBLISH_CONTRACT_PRODUCT: 'publishContractProduct',
    UNPUBLISH_CONTRACT_PRODUCT: 'unpublishContractProduct',
    PUBLISH_FREE_PRODUCT: 'publish',
    UNPUBLISH_FREE_PRODUCT: 'publish',
}

export const productListPageSize = 20

export const searchCharMax = 250
