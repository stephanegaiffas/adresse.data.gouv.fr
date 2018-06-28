import React from 'react'
import PropTypes from 'prop-types'

import {_get} from '../../../lib/fetch'

import Page from '../../../layouts/main'
import withErrors from '../../../components/hoc/with-errors'

import Dataset from '../../../components/bases-locales/bases-adresse-locales/dataset'

class DatasetPage extends React.Component {
  render() {
    const {dataset, summary, report} = this.props
    const description = `${dataset.title} - ${dataset.organization.name}`

    return (
      <Page title={dataset.title} description={description}>
        <Dataset dataset={dataset} summary={summary} report={report} />
      </Page>
    )
  }
}

DatasetPage.propTypes = {
  dataset: PropTypes.shape({
    title: PropTypes.string.isRequired,
    organization: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  summary: PropTypes.object.isRequired,
  report: PropTypes.object
}

DatasetPage.defaultProps = {
  report: null
}

DatasetPage.getInitialProps = async ({query}) => {
  const summary = await _get(`https://adresse.data.gouv.fr/api-bal/datasets/${query.id}/data/summary`)

  return {
    summary,
    dataset: await _get(`https://adresse.data.gouv.fr/api-bal/datasets/${query.id}`),
    report: query.report ? await _get(`https://adresse.data.gouv.fr/api-bal/datasets/${query.id}/report`) : null
  }
}

export default withErrors(DatasetPage)
