import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'

import CommuneStats from './commune-stats'
import DepartementStats from './departement-stats'
import Legend from './legend'
import Back from './back'

import useSources from './hooks/sources'
import useLayers, {COLORS, fillColor, unSelectFillColor} from './hooks/layers'

let hoveredStateId = null

function BANMap({map, departements, communes, selectDepartement, selectCommune, reset, setSources, setLayers, setInfos}) {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const sources = useSources(departements, communes)
  const layers = useLayers(departements, communes)

  const handleClickDepartement = e => {
    const {codeDepartement} = e.features[0].properties

    if (codeDepartement !== '75') { // "arrondissements" have no contours
      map.setFilter('departements-fill', ['!=', ['get', 'codeDepartement'], codeDepartement])
      map.setPaintProperty('departements-fill', 'fill-color', unSelectFillColor)
      map.setPaintProperty('departements-fill', 'fill-opacity', 0.4)

      selectDepartement(codeDepartement)
    }
  }

  const handleClickCommune = e => {
    const {codeCommune} = e.features[0].properties
    selectCommune(codeCommune)
  }

  const onHover = e => {
    if (e.features.length > 0) {
      const {id, source, properties} = e.features[0]
      if (hoveredStateId) {
        map.setFeatureState({source: 'departements', id: hoveredStateId}, {hover: false})
        if (map.getSource('communes')) {
          map.setFeatureState({source: 'communes', id: hoveredStateId}, {hover: false})
        }
      }

      hoveredStateId = id

      setSelectedFeature(properties)

      const cursor = properties.codeDepartement === '75' ? 'default' : 'pointer'
      map.getCanvas().style.cursor = cursor

      map.setFeatureState({source, id: hoveredStateId}, {hover: true})
    }
  }

  const onLeave = () => {
    if (hoveredStateId) {
      map.setFeatureState({source: 'departements', id: hoveredStateId}, {hover: false})
      if (map.getSource('communes')) {
        map.setFeatureState({source: 'communes', id: hoveredStateId}, {hover: false})
      }

      map.getCanvas().style.cursor = 'default'
      hoveredStateId = null
      setSelectedFeature(null)
    }
  }

  const unSelectDepartement = useCallback(() => {
    map.setFilter('departements-fill', ['!=', ['get', 'code'], 0])
    map.setPaintProperty('departements-fill', 'fill-opacity', 0.8)
    map.setCenter([1.7, 46.9])
    map.setZoom(5)

    reset()
  }, [map, reset])

  useEffect(() => {
    if (map.getSource('departements') && !communes) {
      map.setPaintProperty('departements-fill', 'fill-color', fillColor)
    }
  }, [map, communes])

  useEffect(() => {
    map.on('mousemove', 'departements-fill', onHover)
    map.on('mouseleave', 'departements-fill', onLeave)
    map.on('click', 'departements-fill', handleClickDepartement)

    map.on('mousemove', 'communes-fill', onHover)
    map.on('mouseleave', 'communes-fill', onLeave)
    map.on('click', 'communes-fill', handleClickCommune)

    return () => {
      map.off('mousemove', 'departements-fill', onHover)
      map.off('mouseleave', 'departements-fill', onLeave)
      map.off('click', 'departements-fill', handleClickDepartement)

      map.off('mousemove', 'communes-fill', onHover)
      map.off('mouseleave', 'communes-fill', onLeave)
      map.off('click', 'communes-fill', handleClickCommune)
    }

    // No dependency in order to mock a didMount and avoid duplicating events.
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSources(sources)
    setLayers(layers)
  }, [sources, layers, setSources, setLayers])

  useEffect(() => {
    setInfos(communes ? (
      <Back handleClick={unSelectDepartement} />
    ) : null)
  }, [communes, setInfos, unSelectDepartement])

  return (
    <>
      <Legend colors={COLORS} />
      {selectedFeature && (
        <div style={{marginTop: communes ? '50px' : '0'}}>
          {selectedFeature.codeCommune ? (
            <CommuneStats
              {...communes.features.find(f => f.properties.codeCommune === selectedFeature.codeCommune).properties}
            />
          ) : (
            <DepartementStats
              {...departements.features.find(f => f.properties.codeDepartement === selectedFeature.codeDepartement).properties}
            />
          )}
        </div>
      )}
    </>
  )
}

BANMap.propTypes = {
  map: PropTypes.object.isRequired,
  departements: PropTypes.object,
  communes: PropTypes.object,
  selectDepartement: PropTypes.func.isRequired,
  selectCommune: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  setSources: PropTypes.func.isRequired,
  setLayers: PropTypes.func.isRequired,
  setInfos: PropTypes.func.isRequired
}

BANMap.defaultProps = {
  departements: null,
  communes: null
}

export default BANMap
