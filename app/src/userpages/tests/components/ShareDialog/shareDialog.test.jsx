import React from 'react'
import { shallow } from 'enzyme'
import assert from 'assert-diff'
import sinon from 'sinon'
import * as permissionActions from '../../../modules/permission/actions'
import { ShareDialog, mapDispatchToProps } from '../../../components/ShareDialog'

describe('ShareDialog', () => {
    describe('componentDidMount', () => {
        it('calls props.getResourcePermissions', () => {
            const getResourcePermissions = sinon.stub().callsFake(() => Promise.resolve())
            shallow(<ShareDialog
                onClose={() => {}}
                resourceId="resourceId"
                resourceType="resourceType"
                resourceTitle="resourceTitle"
                getResourcePermissions={getResourcePermissions}
            />)
            assert(getResourcePermissions.calledOnce)
        })
    })

    describe('save', () => {
        it('should call props.save and the props.onClose', () => {
            const propSave = sinon.spy()
            const propClose = sinon.spy()
            const getResourcePermissions = sinon.stub().callsFake(() => Promise.resolve())
            const el = (
                <ShareDialog
                    resourceId="testId"
                    resourceType="testType"
                    resourceTitle="testTitle"
                    getResourcePermissions={getResourcePermissions}
                    save={() => new Promise((resolve) => {
                        propSave()
                        resolve()
                    })}
                    onClose={() => new Promise((resolve) => {
                        propClose()
                        resolve()
                    })}
                >
                    <div>test</div>
                </ShareDialog>
            )
            const dialog = shallow(el)
            const instance = dialog.instance()

            instance.save()

            assert(propSave.called)
            process.nextTick(() => {
                assert(propClose.called)
            })
        })
    })

    describe('render', () => {
        describe('initial rendering', () => {
            it('should render correct children with correct props', () => {
                const onClose = () => {}
                const getResourcePermissions = sinon.stub().callsFake(() => Promise.resolve())
                const dialog = shallow(<ShareDialog
                    onClose={onClose}
                    resourceId="resourceId"
                    resourceType="resourceType"
                    resourceTitle="resourceTitle"
                    getResourcePermissions={getResourcePermissions}
                />)

                const content = dialog.find('Connect(ShareDialogContent)')

                assert.deepStrictEqual(content.props().resourceTitle, 'resourceTitle')
                assert.deepStrictEqual(content.props().resourceType, 'resourceType')
                assert.deepStrictEqual(content.props().resourceId, 'resourceId')
            })
        })
    })

    describe('mapDispatchToProps', () => {
        it('should return an object with the right kind of props', () => {
            assert.deepStrictEqual(typeof mapDispatchToProps(), 'object')
            assert.deepStrictEqual(typeof mapDispatchToProps().save, 'function')
            assert.deepStrictEqual(typeof mapDispatchToProps().getResourcePermissions, 'function')
        })

        describe('getResourcePermissions', () => {
            it('should dispatch getResourcePermission with right attrs when called getResourcePermissions', () => {
                const dispatchSpy = sinon.spy()
                const getStub = sinon.stub(permissionActions, 'getResourcePermissions').callsFake((type, id) => `${type}-${id}`)
                mapDispatchToProps(dispatchSpy, {
                    resourceType: 'myType',
                    resourceId: 'myId',
                }).getResourcePermissions()
                assert(dispatchSpy.calledOnce)
                assert(getStub.calledOnce)
                assert(dispatchSpy.calledWith('myType-myId'))
            })
        })

        describe('save', () => {
            it('should return saveUpdatedResourcePermissions and call it with right attrs', () => {
                const dispatchSpy = sinon.spy()
                const saveStub = sinon.stub(permissionActions, 'saveUpdatedResourcePermissions').callsFake((type, id) => `${type}-${id}`)
                mapDispatchToProps(dispatchSpy, {
                    resourceType: 'myType',
                    resourceId: 'myId',
                }).save()
                assert(dispatchSpy.calledOnce)
                assert(dispatchSpy.calledWith('myType-myId'))
                assert(saveStub.calledOnce)
            })
        })
    })
})
