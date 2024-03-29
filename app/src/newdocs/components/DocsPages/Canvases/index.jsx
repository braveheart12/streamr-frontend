// @flow

import React from 'react'
import { Helmet } from 'react-helmet'

import DocsLayout from '../../DocsLayout'
import { subNav } from '../../DocsLayout/Navigation/navLinks'
import CanvasesContent from '$newdocs/content/canvases.mdx'

const Canvases = () => (
    <DocsLayout subNav={subNav.canvases}>
        <Helmet>
            <title>Streamr Docs | Canvases</title>
        </Helmet>
        <CanvasesContent />
    </DocsLayout>
)

export default Canvases
