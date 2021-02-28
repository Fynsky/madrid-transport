import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './StopsPopular.module.scss'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'
import { getTypeOfStop, getIconFromTypeStop } from '../Stop/Stop'
import { useHistory } from 'react-router-dom'

function StopsPopular({ stopsPopular, settings }) {
  const lenguage = settings.systemLanguage
  const classNameStopPopular = classNames(style.main, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  return (
    <div className={classNameStopPopular}>
      <span className={style.headingSpan}>{stringsPatterns['Popular stops:'][lenguage]}</span>
      <div className={style.wrapperPopularItems}>
        {stopsPopular.map(item => (
          <StopPopularItem key={item.numStop} item={item} settings={settings} />
        ))}
      </div>
    </div>
  )
}

StopsPopular.propTypes = {
  stopsPopular: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default StopsPopular

function StopPopularItem({ item, settings }) {
  const history = useHistory()
  const classNamePopularStop = classNames(style.popularStop, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  const type = getTypeOfStop(item.numStop)
  const icon = getIconFromTypeStop(type)
  return (
    <div className={classNamePopularStop} onClick={() => history.push(`/stop/${item.numStop}`)}>
      <div className={style.popularStopInfoBlock}>
        <div>
          <img src={icon} alt="icon popular stop" />
        </div>
        <div>{item.name}</div>
      </div>
      <strong>{item.numStop}</strong>
    </div>
  )
}

StopPopularItem.propTypes = {
  item: PropTypes.object.isRequired,
}
