// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col } from 'reactstrap'
import Select from 'react-select'
import FontAwesome from 'react-fontawesome'

import { setResourceHighestOperationForUser, removeAllResourcePermissionsByUser } from '../../../../../modules/permission/actions'

// TODO: This css file doesnt exist in the dist folder, leaving it out for now.
// import 'react-select/dist/react-select.css'
import type { Permission, ResourceType, ResourceId } from '../../../../../flowtype/permission-types'
import styles from './shareDialogPermission.pcss'

type StateProps = {}

type DispatchProps = {
    setResourceHighestOperation: (value: $ElementType<Permission, 'operation'>) => void,
    remove: () => void
}

type GivenProps = {
    username: string,
    resourceType: ResourceType, // eslint-disable-line react/no-unused-prop-types
    resourceId: ResourceId, // eslint-disable-line react/no-unused-prop-types
    permissions: Array<Permission>
}

type Props = StateProps & DispatchProps & GivenProps

const operationsInOrder = ['read', 'write', 'share']

export class ShareDialogPermission extends Component<Props> {
    onSelect = ({ value }: {value: $ElementType<Permission, 'operation'>}) => { // eslint-disable-line react/no-unused-prop-types
        this.props.setResourceHighestOperation(value)
    }

    onRemove = () => {
        this.props.remove()
    }

    render() {
        const errors = this.props.permissions.filter((p) => p.error).map((p) => p.error && p.error.message)
        const highestOperationIndex = Math.max(...(this.props.permissions.map((p) => operationsInOrder.indexOf(p.operation))))
        const user = this.props.permissions[0] && this.props.permissions[0].user
        return (
            <Col xs={12} className={styles.permissionRow}>
                {errors.length ? (
                    <div className={styles.errorContainer} title={errors.join('\n')}>
                        <FontAwesome name="exclamation-circle" className="text-danger" />
                    </div>
                ) : null}
                {user === this.props.username ? (
                    <span className={styles.userLabel}>
                        <strong className={styles.meLabel}>Me</strong>
                        <span>({user})</span>
                    </span>
                ) : (
                    <span className={styles.userLabel}>
                        {user}
                    </span>
                )}
                <Select
                    className={styles.select}
                    value={{
                        operationsInOrder: operationsInOrder[highestOperationIndex],
                    }}
                    options={operationsInOrder.map((o) => ({
                        value: o,
                        label: `can ${o}`,
                    }))}
                    clearable={false}
                    searchable={false}
                    autosize={false}
                    onChange={this.onSelect}
                />
                <Button color="danger" onClick={this.onRemove}>
                    <FontAwesome name="trash-o" />
                </Button>
            </Col>
        )
    }
}

export const mapDispatchToProps = (dispatch: Function, ownProps: GivenProps): DispatchProps => ({
    setResourceHighestOperation(value: $ElementType<Permission, 'operation'>) {
        const user = ownProps.permissions[0] && ownProps.permissions[0].user
        if (user) {
            dispatch(setResourceHighestOperationForUser(ownProps.resourceType, ownProps.resourceId, user, value))
        }
    },
    remove() {
        const user = ownProps.permissions[0] && ownProps.permissions[0].user
        if (user) {
            dispatch(removeAllResourcePermissionsByUser(ownProps.resourceType, ownProps.resourceId, user))
        }
    },
})

export default connect((state) => ({
    username: state.currentUser.user.username,
}), mapDispatchToProps)(ShareDialogPermission)