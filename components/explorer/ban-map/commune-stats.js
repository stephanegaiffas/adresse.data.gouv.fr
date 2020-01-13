import React from 'react'
import PropTypes from 'prop-types'
import {Users, MapPin, Minimize, AlertTriangle} from 'react-feather'

import Tag from '../../tag'

const CommuneStats = ({codeCommune, nomCommune, adressesCount, voiesCount, sources, type, adressesCountTarget, population, color}) => {
  return (
    <div className='tools feature-stats'>
      <div>
        <h3>{nomCommune} - {codeCommune}</h3>

        <div className='infos'>
          <div>
            <Minimize style={{marginRight: '0.2em'}} />
            {voiesCount} voie{voiesCount > 1 ? 's' : ''}
          </div>
          <div>
            <Users style={{marginRight: '0.2em'}} />
            {population} habitant{population > 1 ? 's' : ''}
          </div>
          <div>
            <MapPin style={{marginRight: '0.2em'}} />
            {adressesCount} adresse{adressesCount > 1 ? 's' : ''}
          </div>
          {color !== '#7fff7a' && (
            <div style={{color: color === '#ff2a2e' ? color : '#FF9947'}}>
              <AlertTriangle style={{marginRight: '0.2em'}} /> Nombre d’adresses attendues : environ {adressesCountTarget}
            </div>
          )}
        </div>

        <div className='source'>
          {type === 'merge' && (
            <>
              Les adresses de cette commune sont issues d’une fusion des données :
              <div className='sources'>
                {sources && sources.map(source => (
                  <div key={source}><Tag type={source} /></div>
                ))}
              </div>
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
        }

        .feature-stats {
          max-width: calc(100% - 55px);
        }

        .infos {
          display: flex;
          flex-direction: column;
          padding: 0 1em;
        }

        .infos div {
          display: flex;
          align-items: center;
          margin: 0.2em 0;
        }

        h3 {
          margin-bottom: 0.5em;
        }

        .source {
          margin-top: 1em;
        }

        .sources {
          display: flex;
          justify-content: space-start;
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

CommuneStats.propTypes = {
  codeCommune: PropTypes.string.isRequired,
  nomCommune: PropTypes.string.isRequired,
  adressesCount: PropTypes.number.isRequired,
  voiesCount: PropTypes.number.isRequired,
  sources: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['merge', 'bal', 'empty']).isRequired,
  adressesCountTarget: PropTypes.number.isRequired,
  population: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
}

export default CommuneStats
