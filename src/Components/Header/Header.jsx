import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import style from './Header.module.scss'
import bus1 from '../../assets/images/busImageColor3.png'
import bus2 from '../../assets/images/busImageColor4.png'
import bus3 from '../../assets/images/busImageColor7.png'
import menuBlack from '../../assets/images/menuIcon.png'
import menuWhite from '../../assets/images/menuWhite.png'
import houseBlack from '../../assets/images/houseBut_3.svg'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function Header({ busImageRef, menuImageRef, showNav }) {
  const settings = useSelector(state => state.settings)
  const lenguage = settings.systemLanguage
  const classNameHeaderMain = classNames(style.headerMain, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
    [style.showNavbar]: showNav,
  })
  const classNameBusImage = classNames('headerBusImage', { [style.busImage]: true })
  const classNameMenuImage = classNames('headerBusImage', {
    [style.menuBlackImage]: settings.screenTheme === 'color',
    [style.menuWhiteImage]: settings.screenTheme === 'dark' || settings.screenTheme === 'light',
  })

  return (
    <div className={classNameHeaderMain}>
      <div className={style.divImagesMenuAndBus}>
        <img
          className={classNameMenuImage}
          ref={menuImageRef}
          alt="icon menu"
          src={settings.screenTheme === 'color' ? menuBlack : menuWhite}
        />
        <img
          className={classNameBusImage}
          alt="main icon bus"
          src={settings.screenTheme === 'color' ? bus2 : settings.screenTheme === 'dark' ? bus1 : bus3}
          ref={busImageRef}
        />
      </div>
      <div className={style.textDiv}>
        <strong>{stringsPatterns['Transport Madrid'][lenguage]}</strong>
      </div>
      <Link to="/">
        <img src={houseBlack} className={style.houseBut} alt="icon house"></img>
      </Link>
    </div>
  )
}

Header.propTypes = {
  busImageRef: PropTypes.object.isRequired,
  menuImageRef: PropTypes.object.isRequired,
  showNav: PropTypes.bool.isRequired,
}

export default Header
