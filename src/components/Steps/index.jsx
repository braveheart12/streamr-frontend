// @flow

import React, { Component, type Node } from 'react'
import Tab from './Tab'

type Props = {
    children: Array<Node>,
    onCancel: () => void,
    onComplete: () => void,
}

type State = {
    currentIndex: number,
}

class Steps extends Component<Props, State> {
    state = {
        currentIndex: 0,
    }

    onTabClick = (currentIndex: number) => {
        this.setState({
            currentIndex,
        })
    }

    onNext = () => {
        const { children, onComplete } = this.props
        const count = React.Children.count(children)
        const { currentIndex } = this.state

        const disabledSteps = this.disabledSteps()
        if (disabledSteps[currentIndex + 1] || currentIndex === count - 1) {
            onComplete()
            return
        }

        this.setState({
            currentIndex: Math.min(currentIndex + 1, count - 1),
        })
    }

    nextButtonLabel = () => {
        const { children } = this.props
        const { currentIndex } = this.state
        const buttonLabels = this.nextButtonLabels()
        return buttonLabels[currentIndex] || (currentIndex === React.Children.count(children) - 1 ? 'Set' : 'Next')
    }

    tabs = () => React.Children.map(this.props.children, (child, index) => (
        <Tab
            index={index}
            active={this.state.currentIndex === index}
            onClick={this.onTabClick}
            disabled={this.state.currentIndex < index}
        >
            {child.props.title}
        </Tab>
    ))

    disabledSteps = () => React.Children.map(this.props.children, (child) => child.props.disabled || false)
    nextButtonLabels = () => React.Children.map(this.props.children, (child) => child.props.nextButtonLabel || '')

    contents = () => React.Children.map(this.props.children, (child, index) => React.cloneElement(child, {
        active: this.state.currentIndex === index,
    }))

    render = () => (
        <div>
            {this.tabs()}
            {this.contents()}
            <button onClick={this.props.onCancel}>Cancel</button>
            <button onClick={this.onNext}>{this.nextButtonLabel()}</button>
        </div>
    )
}

export default Steps