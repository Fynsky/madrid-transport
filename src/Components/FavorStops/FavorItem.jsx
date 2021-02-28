import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'

import style from './FavorItem.module.scss'
import { getTypeOfStop, getIconFromTypeStop } from '../Stop/Stop'

const FavorItem = React.memo(({ item, settings }) => {
  const history = useHistory()
  const classNameFavorItemMain = classNames(style.favorItem, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  const type = getTypeOfStop(item.stopNumber)
  const icon = getIconFromTypeStop(type)

  return (
    <div className={classNameFavorItemMain} onClick={() => history.push(`/stop/${item.stopNumber}`)}>
      <span>
        <img src={icon} alt="Icon of my favorite stopover" />
        <div>{item.stopName}</div>
      </span>
      <span>
        <strong>{item.stopNumber}</strong>
      </span>
    </div>
  )
})

FavorItem.propTypes = {
  item: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

export default FavorItem
