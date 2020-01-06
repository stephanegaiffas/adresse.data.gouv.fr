import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import computeBbox from '@turf/bbox'

import Page from '../layouts/main'

import withErrors from '../components/hoc/with-errors'

import {getDepartements, getDepartementCommunes} from '../lib/api-ban'

import Mapbox from '../components/mapbox'

import BANMap from '../components/ban-dashboard/ban-map'
import {contoursToGeoJson} from '../lib/geojson'

const title = 'Base Adresse National 2020 - Tableau de bord'
const description = ''

function generateDepartementId(code) {
  let id = code

  // Corse
  if (code === '2A') {
    id = 200
  } else if (code === '2B') {
    id = 201
  } else {
    id = code.replace(/[AB]/, 0)
  }

  return id
}

function departementContour(departement) {
  const {contour, codeDepartement, ...otherProps} = departement

  return {
    id: generateDepartementId(codeDepartement),
    type: 'Feature',
    geometry: contour,
    properties: {
      codeDepartement,
      ...otherProps
    }
  }
}

function communeContour(commune) {
  const {contour, codeCommune, ...otherProps} = commune

  return {
    id: codeCommune,
    type: 'Feature',
    geometry: contour,
    properties: {
      codeCommune,
      ...otherProps
    }
  }
}

export function contoursDepartementsToGeoJson(departements) {
  const departementsWithCtr = departements.filter(dep => dep.contour)

  return {
    type: 'FeatureCollection',
    features: departementsWithCtr.map(dep => departementContour(dep))
  }
}

function DashboardBan2020({departements}) {
  const [departement, setDepartement] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [bbox, setBbox] = useState(null)
  const [error, setError] = useState(null)

  const loadDepartement = async codeDepartement => {
    setIsLoading(true)
    setError(null)

    try {
      const departement = await getDepartementCommunes(codeDepartement)
      const geojson = contoursToGeoJson(departement.communes, communeContour)
      setDepartement(geojson)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  const reset = () => {
    setDepartement(null)
    setError(null)
  }

  useEffect(() => {
    setBbox(departement ? computeBbox(departement) : null)
  }, [departement])

  return (
    <Page title={title} description={description} showFooter={false}>
      <div className='ban-map-container'>
        <Mapbox
          error={error}
          loading={isLoading}
          bbox={bbox}
          hasSwitchStyle={false}
        >
          {({...mapboxProps}) => (
            <BANMap
              {...mapboxProps}
              departements={departements}
              communes={departement}
              selectDepartement={loadDepartement}
              reset={reset}
            />
          )}
        </Mapbox>
      </div>

      <style jsx>{`
        .error {
          position: absolute;
          z-index: 999;
          margin: 1em;
        }

        .ban-map-container {
          width: 100%;
          height: calc(100vh - 78px);
        }

        @media (max-width: 380px) {
          .ban-map-container {
            height: calc(100vh - 63px);
          }
        }
      `}</style>
    </Page>
  )
}

DashboardBan2020.propTypes = {
  departements: PropTypes.object.isRequired
}

DashboardBan2020.getInitialProps = async () => {
  const {departements} = await getDepartements()
  const geojson = contoursToGeoJson(departements, departementContour)

  return {
    departements: geojson
  }
}

export default withErrors(DashboardBan2020)
