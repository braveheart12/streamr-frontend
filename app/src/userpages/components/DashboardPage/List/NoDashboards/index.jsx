// @flow

import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'
import MediaQuery from 'react-responsive'

import EmptyState from '$shared/components/EmptyState'
import emptyStateIcon from '$shared/assets/images/empty_state_icon.png'
import emptyStateIcon2x from '$shared/assets/images/empty_state_icon@2x.png'
import noResultIcon from '$shared/assets/images/search_no_result.png'
import noResultemptyStateIcon2x from '$shared/assets/images/search_no_result@2x.png'
import type { Filter } from '$userpages/flowtype/common-types'
import breakpoints from '$app/scripts/breakpoints'

type NoResultsViewProps = {
    onResetFilter: Function,
    filter: ?Filter,
}
type Props = NoResultsViewProps & {
    hasFilter: boolean,
}

const NoCreatedDashboardsView = () => (
    <EmptyState
        image={(
            <img
                src={emptyStateIcon}
                srcSet={`${emptyStateIcon2x} 2x`}
                alt={I18n.t('error.notFound')}
            />
        )}
    >
        <Translate value="userpages.dashboards.noCreatedDashboards.title" />
        <MediaQuery minWidth={breakpoints.lg.min}>
            <Translate value="userpages.dashboards.noCreatedDashboards.message" tag="small" />
        </MediaQuery>
        <MediaQuery maxWidth={breakpoints.lg.min}>
            <Translate value="userpages.dashboards.noCreatedDashboards.messageMobile" tag="small" />
        </MediaQuery>
    </EmptyState>
)

const NoResultsView = ({ onResetFilter }: NoResultsViewProps) => (
    <EmptyState
        image={(
            <img
                src={noResultIcon}
                srcSet={`${noResultemptyStateIcon2x} 2x`}
                alt={I18n.t('error.notFound')}
            />
        )}
        link={(
            <button
                type="button"
                className="btn btn-special"
                onClick={onResetFilter}
            >
                <Translate value="userpages.dashboards.noDashboardsResult.clearFilters" />
            </button>
        )}
    >
        <Translate value="userpages.dashboards.noDashboardsResult.title" />
        <Translate value="userpages.dashboards.noDashboardsResult.message" tag="small" />
    </EmptyState>
)

const NoDashboardsView = ({ hasFilter, ...rest }: Props) => {
    if (hasFilter) {
        return (
            <NoResultsView {...rest} />
        )
    }

    return <NoCreatedDashboardsView />
}

export default NoDashboardsView
