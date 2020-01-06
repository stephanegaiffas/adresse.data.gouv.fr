import {useMemo} from 'react'

export const COLORS = {
  green: '#7fff7a',
  yellow: '#ffff00',
  orange: '#ff9900',
  red: '#ff2a2e',
  purple: '#6D029F',
  black: '#000'
}

export const fillColor = [
  'step',
  ['/', ['get', 'communesWithWarnings'], ['get', 'communesCount']],
  COLORS.green,
  0.05,
  COLORS.yellow,
  0.1,
  COLORS.orange,
  0.2,
  COLORS.red,
  0.4,
  COLORS.purple,
  1,
  '#000'
]

export const communeFillColor = [
  'step',
  ['get', 'adressesRatio'],
  COLORS.green,
  0,
  COLORS.yellow,
  100,
  COLORS.orange,
  400,
  COLORS.red,
  600,
  COLORS.purple,
  800,
  '#000'
]

export const unSelectFillColor = [
  'case',
  ['boolean', ['feature-state', 'hover'], false],
  fillColor,
  '#000'
]

const lineLayerPaint = {
  'line-width': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    3,
    1
  ]
}

export default function useLayers(departements, communes) {
  return useMemo(() => {
    const layers = []

    if (departements) {
      layers.push({
        id: 'departements-fill',
        source: 'departements',
        type: 'fill',
        paint: {
          'fill-color': fillColor,
          'fill-opacity': 0.8
        }
      })
      layers.push({
        id: 'departements-line',
        source: 'departements',
        type: 'line',
        paint: lineLayerPaint
      })
    }

    if (communes) {
      layers.push({
        id: 'communes-fill',
        source: 'communes',
        type: 'fill',
        paint: {
          'fill-color': communeFillColor,
          'fill-opacity': 0.8
        }
      })
      layers.push({
        id: 'communes-line',
        source: 'communes',
        type: 'line',
        paint: lineLayerPaint
      })
    }

    return layers
  }, [departements, communes])
}
