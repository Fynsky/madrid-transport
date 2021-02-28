import React from 'react'
import PropTypes from 'prop-types'

import FavorItem from './FavorItem'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function FavoritesList({ myFavArr, settings }) {
  const lenguage = settings.systemLanguage
  return (
    <div>
      {myFavArr.length ? (
        myFavArr.map(item => {
          return <FavorItem item={item} key={item.stopNumber} settings={settings} />
        })
      ) : (
        <p>{stringsPatterns['No favorite stops!'][lenguage]}</p>
      )}
    </div>
  )
}

FavoritesList.propTypes = {
  myFavArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  settings: PropTypes.object.isRequired,
}

export default FavoritesList
