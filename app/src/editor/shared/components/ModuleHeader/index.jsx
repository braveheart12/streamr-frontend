// @flow

import React, { useState, type Node, Fragment } from 'react'
import cx from 'classnames'
import EditableText from '$shared/components/EditableText'
import ResizerProbe from '$editor/canvas/components/Resizer/Probe'
import styles from './moduleHeader.pcss'

type Props = {
    children?: Node,
    className?: string,
    editable?: boolean,
    label: string,
    limitWidth?: boolean,
    onLabelChange: (string) => void,
}

const ModuleHeader = ({
    children,
    className,
    editable,
    label,
    limitWidth,
    onLabelChange,
    ...props
}: Props) => {
    const [editing, setEditing] = useState(false)

    return (
        <Fragment>
            {/* ModuleHeader's minWidth is always 92px. */}
            <ResizerProbe group="ModuleHeader" width={92} />
            {/* ModuleHeader's minHeight is always 41px (40px and 1px of border-bottom). */}
            <ResizerProbe group="ModuleHeight" height={41} id="ModuleHeader" />
            <div
                className={cx(styles.root, className)}
                {...props}
            >
                {/* TODO: Replace the following line with the actual toggle. This here is just a placeholder. */}
                <div className={styles.expandToggle} />
                <div
                    className={cx(styles.name, {
                        [styles.limitedWidth]: !!(limitWidth && editing),
                    })}
                >
                    <div
                        className={cx({
                            [styles.idle]: !editing,
                        })}
                    >
                        <EditableText
                            className={cx({
                                [styles.limitedWidth]: !!limitWidth,
                            })}
                            disabled={!editable}
                            editing={editing}
                            onChange={onLabelChange}
                            setEditing={setEditing}
                        >
                            {label}
                        </EditableText>
                    </div>
                </div>
                {children}
            </div>
        </Fragment>
    )
}

ModuleHeader.defaultProps = {
    children: null,
    editable: true,
}

ModuleHeader.styles = styles

export default ModuleHeader
