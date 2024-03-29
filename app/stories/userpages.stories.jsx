// $flow

import React from 'react'
import { Provider } from 'react-redux'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import styles from '@sambego/storybook-styles'

import store from './utils/i18nStore'

import TOCPage from '$userpages/components/TOCPage'
import Avatar from '$userpages/components/Avatar'
import KeyField from '$userpages/components/KeyField'

const story = (name) => storiesOf(`UserPages/${name}`, module)
    .addDecorator(StoryRouter())
    .addDecorator(styles({
        padding: '15px',
        color: 'black',
    }))
    .addDecorator((callback) => (<Provider store={store}>{callback()}</Provider>))
    .addDecorator(withKnobs)

story('TOCPage')
    .addWithJSX('basic', () => {
        const showLinkTitle = boolean('Use different link title', false)

        return (
            <TOCPage title={boolean('Include Page title', true) && text('Page title', 'Page Title')}>
                <TOCPage.Section
                    title={text('First section title', 'First Section')}
                    linkTitle={showLinkTitle && text('First section link', 'First')}
                >
                    Use the knobs section to control the page content.
                </TOCPage.Section>
                <TOCPage.Section
                    title={text('Second section title', 'Second Section')}
                    linkTitle={showLinkTitle && text('Second section link', 'Second')}
                >
                    Content goes here
                </TOCPage.Section>
            </TOCPage>
        )
    })

story('Avatar')
    .addWithJSX('basic', () => {
        const user = {
            name: text('Name', 'Matt Innes'),
            username: text('Username', 'matt@streamr.com'),
            imageUrl: boolean('showImage', true) ? 'https://www.streamr.com/assets/TeamPhotos/Matt.jpg' : null,
        }

        return (
            <Avatar
                editable={boolean('Editable', false)}
                user={user}
                onImageChange={() => Promise.resolve()}
            />
        )
    })

story('KeyField')
    .addWithJSX('basic', () => (
        <KeyField
            keyName={text('Key name')}
            value={text('Value')}
            hideValue={boolean('Hide value')}
            allowEdit={boolean('Allow edit')}
            onSave={() => {
                alert('Saved!') // eslint-disable-line no-alert
            }}
            allowDelete={boolean('Allow delete')}
            onDelete={() => {
                alert('Deleted!') // eslint-disable-line no-alert
            }}
        />
    ))
