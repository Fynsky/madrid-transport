import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import style from './Navbar.module.scss'
import stopImage from '../../assets/images/stopImage3.png'
import cardTransport from '../../assets/images/cardTransport1.png'
import mapIcon from '../../assets/images/mapIcon2.png'
import { ReactComponent as SettingsIcon } from '../../assets/images/settingsIcon2.svg'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function Navbar({ onClickHandler }) {
  const settings = useSelector(state => state.settings)
  const lenguage = settings.systemLanguage
  const classNameMainNavbar = classNames(style.navbarMain, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  return (
    <div className={classNameMainNavbar}>
      <div onClick={onClickHandler}>
        <Link to="/" className={style.link}>
          <img src={stopImage} className={style.imageIcon} alt="icon Bus page" />
          <span>{stringsPatterns['Bus page'][lenguage]}</span>
        </Link>
      </div>
      <div onClick={onClickHandler}>
        <Link to="/cardExpiration" className={style.link}>
          <img src={cardTransport} className={style.imageIcon} alt="icon Сard expiration" />
          <span>{stringsPatterns['Сard expiration'][lenguage]}</span>
        </Link>
      </div>
      <div onClick={onClickHandler}>
        <Link to="/maps" className={style.link}>
          <img src={mapIcon} className={style.imageIcon} alt="icon Maps" />
          <span>{stringsPatterns['Maps'][lenguage]}</span>
        </Link>
      </div>
      <div onClick={onClickHandler}>
        <Link to="/settings" className={style.link}>
          <SettingsIcon className={style.imageIcon} alt="icon Settings" />
          <span>{stringsPatterns['Settings'][lenguage]}</span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
