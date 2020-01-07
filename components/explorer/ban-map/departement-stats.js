import React from 'react'
import PropTypes from 'prop-types'

const DepartementStats = ({nomDepartement, codeDepartement, communesCount, communesWithWarnings}) => {
  return (
    <div className='tools feature-stats'>
      <div>
        <h3>{nomDepartement} - {codeDepartement}</h3>
        <div>
          <b>{communesCount}</b> communes, dont <b>{communesWithWarnings}</b> à surveiller.
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

        @media (max-width: 620px) {
          .feature-stats {
            font-size: small;
          }
        }
        `}</style>
    </div>
  )
}

DepartementStats.propTypes = {
  nomDepartement: PropTypes.string.isRequired,
  codeDepartement: PropTypes.string.isRequired,
  communesWithWarnings: PropTypes.number.isRequired,
  communesCount: PropTypes.number.isRequired
}

export default DepartementStats
