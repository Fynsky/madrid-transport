import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import style from './ConsultStop.module.scss'
import { getTypeOfStop } from '../Stop/Stop'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function ConsultStop({ item, ...props }) {
  const settings = useSelector(state => state.settings)
  const lenguage = settings.systemLanguage
  const classNameMainDiv = classNames(style.mainDiv, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  return (
    <div className={classNameMainDiv}>
      <h4>{item[1]}</h4>
      <h5>
        {stringsPatterns['Stop:'][lenguage]} {getTypeOfStop(item[0])} {item[0]}
      </h5>
      <div>
        {stringsPatterns['Lines:'][lenguage]} {item[4].join(', ')}
      </div>
      <button className="red button" type="submit" onClick={() => props.history.push(`/stop/${item[0]}`)}>
        {stringsPatterns['Get data'][lenguage]}
      </button>
    </div>
  )
}

ConsultStop.propTypes = {
  item: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
}

export default ConsultStop
