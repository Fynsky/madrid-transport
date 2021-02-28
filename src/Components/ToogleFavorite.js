import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './BusInfo.module.scss'
import ModalFavor from './Modal/ModalFavor'
import { stringsPatterns } from '../assets/strings/stringsPatterns'

function ToogleFavorite({ isFavorStop, item, addFavorStop, removeFavorStop, settings }) {
  const lenguage = settings.systemLanguage
  const classNameToogleFavoriteMain = classNames(style.divAddToFavor, {
    [style.colorTheme]: settings.screenTheme === 'colorTheme',
    [style.darkTheme]: settings.screenTheme === 'darkTheme',
    [style.lightTheme]: settings.screenTheme === 'lightTheme',
  })
  return (
    <div>
      <form>
        <div className={classNameToogleFavoriteMain}>
          {isFavorStop ? (
            <span>{stringsPatterns['Remove from favourites'][lenguage]}</span>
          ) : (
            <span>{stringsPatterns['Add to favourites'][lenguage]}</span>
          )}

          <ModalFavor
            item={item}
            isFavorStop={isFavorStop}
            settings={settings}
            addFavorStop={addFavorStop}
            removeFavorStop={removeFavorStop}
          />
        </div>
      </form>
    </div>
  )
}

ToogleFavorite.propTypes = {
  isFavorStop: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  addFavorStop: PropTypes.func.isRequired,
  removeFavorStop: PropTypes.func.isRequired,
}

export default ToogleFavorite
