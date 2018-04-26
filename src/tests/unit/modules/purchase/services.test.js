import assert from 'assert-diff'
import sinon from 'sinon'

import * as all from '../../../../modules/purchase/services'
import * as utils from '../../../../utils/smartContract'

describe('Product services', () => {
    let sandbox
    beforeEach(() => {
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('buyProduct', () => {
        it('must transform the id to hex', () => {
            const buyStub = sinon.stub().callsFake(() => ({
                send: () => 'test',
            }))
            sandbox.stub(utils, 'send').callsFake((method) => method.send())
            sandbox.stub(utils, 'getContract').callsFake(() => ({
                methods: {
                    buy: buyStub,
                },
            }))
            all.buyProduct('aapeli', 1000)
            assert(buyStub.calledOnce)
            assert(buyStub.calledWith('0xaapeli', 1000))
        })
        it('must call send with correct object', (done) => {
            sandbox.stub(utils, 'send').callsFake((a) => {
                assert.equal('test', a)
                done()
            })
            sandbox.stub(utils, 'getContract').callsFake(() => ({
                methods: {
                    buy: () => 'test',
                },
            }))
            all.buyProduct('aapeli', 1000)
        })
        it('must return the result of send', () => {
            sandbox.stub(utils, 'send').callsFake(() => 'test')
            sandbox.stub(utils, 'getContract').callsFake(() => ({
                methods: {
                    buy: () => {
                    },
                },
            }))
            assert.equal('test', all.buyProduct('aapeli', 1000))
        })
    })
})