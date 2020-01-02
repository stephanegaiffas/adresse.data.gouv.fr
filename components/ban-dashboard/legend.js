import React from 'react'
import PropTypes from 'prop-types'

const Legend = ({colors}) => (
  <div className='tools legend'>
    <div className='title'>État de la Base Adresse Nationale sous Licence Ouverte</div>
    <div className='graduation'>
      <div className='color-label' style={{marginRight: '5px'}}>BAN v0</div>
      <div className='color' style={{backgroundColor: colors.green}} />
      <div className='color' style={{backgroundColor: colors.yellow}} />
      <div className='color' style={{backgroundColor: colors.orange}} />
      <div className='color' style={{backgroundColor: colors.red}} />
      <div className='color' style={{backgroundColor: colors.purple}} />
      <div className='color' style={{backgroundColor: colors.black}} />
      <div className='color-label' style={{marginLeft: '5px'}}>BAN LO</div>
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

    .legend {
      display: flex;
      flex-direction: column;
      bottom: 0;
      left: 0;
    }

    .legend .title {
      font-size: small;
      margin-bottom: 5px;
    }

    .legend .color-label {
      font-size: x-small;
    }

    .legend .graduation {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .legend .color {
      flex: 1;
      height: 10px;
      width: 30px;
    }

    @media (max-width: 620px) {
      .legend {
        left: 0;
        bottom: 0;
        margin: 0.5em;
        width: calc(100% - 50px);
      }

      .legend .title {
        font-size: x-small;
      }

      .legend .color-label {
        font-size: xx-small;
      }
    }
  `}</style>
  </div>
)

Legend.propTypes = {
  colors: PropTypes.object.isRequired
}

export default Legend
