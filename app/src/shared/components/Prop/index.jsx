// @flow

import { useState, type Node } from 'react'

type Props = {
    initialValue?: any,
    children: (any, (any) => void) => Node,
}

const Prop = ({ children, initialValue }: Props) => {
    const [value, setValue] = useState(initialValue)
    return children(value, setValue)
}

export default Prop
