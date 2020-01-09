import React from 'react'
import PropTypes from 'prop-types'

const FeatureStats = ({codeCommune, nomCommune, adressesCount, voiesCount, sources, type, adressesCountTarget, population}) => {
  return (
    <div className='tools feature-stats'>
      <div>
        <h3>{nomCommune} - {codeCommune}</h3>
        <ul>
          <li>{voiesCount} voie{voiesCount > 1 ? 's' : ''}</li>
          <li>{adressesCount} adresse{adressesCount > 1 ? 's' : ''}</li>
          <li>{population} habitant{population > 1 ? 's' : ''}</li>
          <li>Nombre d’adresses cible : {adressesCountTarget}</li>
        </ul>
        <div>
          {type === 'merge' && (
            <>
              <div>Les adresses de cette commune sont issues d’une fusion des données :</div>
              <ul>
                {sources && sources.map(source => <li key={source}>{source}</li>)}
              </ul>
            </>
          )}

          {type === 'bal' && (
            <p>Les adresses sont gérées par la commune</p>
          )}
        </div>
      </div>

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

        .feature-stats {
          max-width: calc(100% - 55px);
        }

        @media (min-width: 620px) {
          .feature-stats {
            max-width: 20%;
          }
        }

        @media (max-width: 620px) {
          .feature-stats {
            font-size: small;
          }
        }
        `}</style>
    </div>
  )
}

FeatureStats.propTypes = {
  codeCommune: PropTypes.string.isRequired,
  nomCommune: PropTypes.string.isRequired,
  adressesCount: PropTypes.number.isRequired,
  voiesCount: PropTypes.number.isRequired,
  sources: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['merge', 'bal', 'empty']).isRequired,
  adressesRatio: PropTypes.number.isRequired,
  population: PropTypes.number.isRequired
}

export default FeatureStats
