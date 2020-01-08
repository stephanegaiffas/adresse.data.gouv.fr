import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import computeBbox from '@turf/bbox'

import Page from '../layouts/main'

import {contoursToGeoJson} from '../lib/geojson'
import {getDepartements, getDepartementCommunes} from '../lib/api-explore'

import Mapbox from '../components/mapbox'
import BANMap from '../components/explorer/ban-map'
import Header from '../components/explorer/header'
import {COLORS} from '../components/explorer/ban-map/hooks/layers'

const title = 'Consulter'
const description = 'Consulter les adresses'

const colorBigCommune = ratio => {
  let color = COLORS.black

  if (ratio < 100) {
    color = COLORS.green
  } else if (ratio < 500) {
    color = COLORS.yellow
  } else if (ratio < 800) {
    color = COLORS.orange
  } else if (ratio < 1000) {
    color = COLORS.red
  } else if (ratio < 1500) {
    color = COLORS.purple
  }

  return color
}

const colorLittleCommune = ratio => {
  let color = COLORS.black

  if (ratio < 10) {
    color = COLORS.green
  } else if (ratio < 50) {
    color = COLORS.yellow
  } else if (ratio < 100) {
    color = COLORS.orange
  } else if (ratio < 300) {
    color = COLORS.red
  } else if (ratio < 500) {
    color = COLORS.purple
  }

  return color
}

function colorCommune(commune) {
  const {type, population, adressesRatio} = commune
  if (type === 'bal') {
    commune.color = COLORS.green
  } else if (population > 10000) {
    commune.color = colorBigCommune(adressesRatio)
  } else {
    commune.color = colorLittleCommune(adressesRatio)
  }
}

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

const Explore = ({departements}) => {
  const [communes, setCommunes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [bbox, setBbox] = useState(null)
  const [error, setError] = useState(null)

  const loadDepartement = async codeDepartement => {
    setIsLoading(true)
    setError(null)

    try {
      const departement = await getDepartementCommunes(codeDepartement)
      departement.communes.forEach(colorCommune)
      const geojson = contoursToGeoJson(departement.communes, communeContour)
      setCommunes(geojson)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  const selectCommune = codeCommune => {
    const href = `/commune?codeCommune=${codeCommune}`
    const as = `/explore/commune/${codeCommune}`

    Router.push(href, as)
  }

  const reset = () => {
    setCommunes(null)
    setError(null)
    setIsLoading(false)
  }

  useEffect(() => {
    setBbox(communes ? computeBbox(communes) : null)
  }, [communes])

  return (
    <Page title={title} description={description} showFooter={false}>
      <Header />
      <div className='explore-map-container'>
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
              communes={communes}
              selectDepartement={loadDepartement}
              selectCommune={selectCommune}
              reset={reset}
            />
          )}
        </Mapbox>
      </div>

      <style jsx>{`
        .explore-map-container {
          height: calc(100vh - 350px);
        }
      `}</style>
    </Page>
  )
}

Explore.propTypes = {
  departements: PropTypes.object.isRequired
}

Explore.getInitialProps = async () => {
  const {departements} = await getDepartements()
  const geojson = contoursToGeoJson(departements, departementContour)

  return {
    departements: geojson
  }
}

export default Explore
