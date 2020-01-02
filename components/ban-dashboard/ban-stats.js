import React from 'react'
import PropTypes from 'prop-types'

function formatNumber(nb) {
  return nb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function roundNb(nb) {
  return nb ? Math.round(nb * 100) : null
}

const BanStats = ({properties}) => {
  const total = formatNumber(properties.total)
  const banV0Only = formatNumber(properties['ban-v0-only'])
  const banLOOnly = formatNumber(properties['ban-lo-only'])
  const both = formatNumber(properties.both)
  const pseudoAdresse = formatNumber(properties['pseudo-adresse'])
  const banV0OnlyRatio = roundNb(properties['ban-v0-only-ratio'])
  const banLOOnlyRatio = roundNb(properties['ban-lo-only-ratio'])

  return (
    <div className='tools ban-stats'>
      <h3>{properties.nom} - {properties.code}</h3>
      <p>
        <b>{total}</b> adresses uniques
      </p>
      {properties.total > 0 && (
        <ul>
          <li>
            <b>{banV0Only}</b>{' '}
            <span className='more'>
              présentes uniquement dans la
            </span> BAN v0 {banV0OnlyRatio && (<b>({banV0OnlyRatio}%)</b>)}
          </li>
          <li>
            <b>{banLOOnly}</b>{' '}
            <span className='more'>
              présentes uniquement dans la
            </span> BAN LO {banLOOnlyRatio && (<b>({banLOOnlyRatio}%)</b>)}
          </li>
          <li>
            <b>{both}</b>{' '}
            <span className='more'>
              présentes dans la
            </span> BAN v0 et la BAN LO
          </li>
          <li>
            <b>{pseudoAdresse}</b> pseudo-adresses</li>
        </ul>
      )}

      <style jsx>{`
        .tools {
          position: absolute;
          z-index: 999;
          background: #ffffffbb;
          padding: 0.5em;
          margin: 0.5em;
          border-radius: 4px;
          top:
        }

        .ban-stats {
          max-width: calc(100% - 55px);
        }

        ul {
          padding-inline: 2em;
          line-height: 1.4em;
        }

        @media (max-width: 620px) {
          .ban-stats {
            font-size: small;
          }

          .more {
            display: none;
          }
        }
        `}</style>
    </div>
  )
}

BanStats.propTypes = {
  properties: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    total: PropTypes.number,
    both: PropTypes.number,
    'ban-v0-only': PropTypes.number,
    'ban-lo-only': PropTypes.number,
    'pseudo-adresse': PropTypes.number,
    'ban-v0-only-ratio': PropTypes.number,
    'ban-lo-only-ratio': PropTypes.number
  }).isRequired
}

export default BanStats
