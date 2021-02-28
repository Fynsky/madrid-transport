import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './Maps.module.scss'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'
import mapMetro from '../../assets/images/mapa_metro.jpg'
import mapNight from '../../assets/images/mapa_emt_nocturnos.jpg'
import planCerc from '../../assets/images/plano_cercanias.jpg'
import planMetro from '../../assets/images/plano_metro.jpg'

function Maps(props) {
  const settings = props.settings
  const lenguage = settings.systemLanguage
  const classNameMainMaps = classNames(style.main, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  return (
    <div className={classNameMainMaps}>
      <div className={style.stringDiv}>
        <Link to="maps/planCerc" className={style.link}>
          <img src={planCerc} alt="Map plan cercanias" />
          <div>{stringsPatterns['Plan Cercanias'][lenguage]}</div>
        </Link>
        <Link to="maps/planMetro" className={style.link}>
          <img src={planMetro} alt="Map Plan Metro" />
          <div>{stringsPatterns['Plan Metro'][lenguage]}</div>
        </Link>
      </div>

      <div className={style.stringDiv}>
        <Link to="maps/mapMetro" className={style.link}>
          <img src={mapMetro} alt="Map Metro" />
          <div>{stringsPatterns['Map Metro'][lenguage]}</div>
        </Link>
        <Link to="maps/mapNight" className={style.link}>
          <img src={mapNight} alt="Map Night Buses" />
          <div>{stringsPatterns['Map Night Buses'][lenguage]}</div>
        </Link>
      </div>
    </div>
  )
}

export default Maps
