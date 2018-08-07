// @flow

// Network IDs introduced in utils/constants.js

module.exports = {
    environments: {
        production: {
            networkId: 1,
            publicNodeAddress: 'https://mainnet.infura.io',
        },
        development: {
            networkId: 4,
            publicNodeAddress: 'https://rinkeby.infura.io',
        },
    },
}
