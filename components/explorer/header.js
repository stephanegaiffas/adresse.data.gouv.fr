import React from 'react'

import Container from '../container'
import ExploreSearch from './explore-search'

const Explorer = () => (
  <Container>
    <div className='header-section'>
      <h2>Rechercher une commune, une voie ou une adresse</h2>
      <ExploreSearch />
    </div>

    <style jsx>{`
        .header-section {
          padding: 2em 0;
        }
    `}</style>
  </Container>
)

export default Explorer
