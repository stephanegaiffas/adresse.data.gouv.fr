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
  'let',
  'warning',
  ['/', ['get', 'communesWithWarnings'], ['get', 'communesCount']],
  [
    'interpolate',
    ['linear'],
    ['var', 'warning'],
    0,
    ['to-color', COLORS.green],
    0.2,
    ['to-color', COLORS.yellow],
    0.4,
    ['to-color', COLORS.orange],
    0.6,
    ['to-color', COLORS.red],
    0.8,
    ['to-color', COLORS.purple],
    1,
    ['to-color', COLORS.black]
  ]
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
          'fill-color': ['get', 'color'],
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
