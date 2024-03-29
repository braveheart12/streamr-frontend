// @flow

import React, { type Node, type Context, createContext, useMemo, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

type ContextProps = {
    minHeight: number,
    minWidth: number,
    probeRefreshCount: number,
    refreshProbes: () => void,
    setDimensions: ({
        height?: [string, string, number],
        width?: [string, string, number],
    }) => void,
}

const defaultContext: ContextProps = {
    minHeight: 0,
    minWidth: 0,
    probeRefreshCount: 0,
    refreshProbes: () => {},
    setDimensions: () => {},
}

const SizeConstraintContext: Context<ContextProps> = createContext(defaultContext)

export { SizeConstraintContext as Context }

type Props = {
    children?: Node,
}

const SizeConstraintProvider = ({ children }: Props) => {
    const [dim, setDim] = useState({
        heights: {},
        widths: {},
    })
    const [probeRefreshCount, setProbeRefreshCount] = useState(0)

    const setDimensions = useCallback(({ width, height }) => {
        setDim(({ heights, widths }) => ({
            heights: {
                ...heights,
                ...((() => {
                    if (height) {
                        const [group, uid, value] = height
                        return {
                            [group]: {
                                ...heights[group],
                                [uid]: value,
                            },
                        }
                    }
                })()),
            },
            widths: {
                ...widths,
                ...((() => {
                    if (width) {
                        const [group, uid, value] = width
                        return {
                            [group]: {
                                ...widths[group],
                                [uid]: value,
                            },
                        }
                    }
                })()),
            },
        }))
    }, [setDim])

    const refreshProbes = useCallback(debounce(() => {
        setProbeRefreshCount((count) => count + 1)
    }, 200), [])

    const { minWidth, minHeight } = useMemo(() => ({
        minHeight: Object.values(dim.heights).reduce((min, group) => (
            Math.max(Object.values(group).reduce((sum, value) => sum + ((value: any): number), 0), min)
        ), 0),
        minWidth: Object.values(dim.widths).reduce((min, group) => (
            Math.max(Object.values(group).reduce((sum, value) => sum + ((value: any): number), 0), min)
        ), 0),
    }), [dim])

    const value = useMemo(() => ({
        minHeight,
        minWidth,
        probeRefreshCount,
        refreshProbes,
        setDimensions,
    }), [
        minHeight,
        minWidth,
        probeRefreshCount,
        refreshProbes,
        setDimensions,
    ])

    return (
        <SizeConstraintContext.Provider value={value}>
            {children}
        </SizeConstraintContext.Provider>
    )
}

export default SizeConstraintProvider
