import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import BusPageContainer from './Components/BusPageContainer'
import Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'
import CardExpirationContainer from './Components/Card expiration/CardExpirationContainer'
import BusInfoContainer from './Components/BusInfoContainer'
import SettingsContainer from './Components/Settings/SettingsContainer'
import style from './App.module.scss'
import Maps from './Components/Maps/Maps'
import MapItem from './Components/Maps/MapItem'
import MapingLineContainer from './Components/MapingLines/MapingLineContainer'

function App() {
  const settings = useSelector(state => state.settings)
  const [showNav, setShowNav] = useState(false)
  const nodeNav = useRef()
  const nodeBusImage = useRef()
  const nodeMenuImage = useRef()
  const classNameMainContent = classNames('app-wrapper-content', {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
    showNavBar: showNav,
  })
  const сlassNameNavBar = classNames({
    navbar: true,
    showNavBar: showNav,
  })
  const classNameHeader = classNames({
    header: true,
    fixHeader: showNav,
  })

  function toggleNavbar() {
    if (classNameHeader.includes('fixHeader')) {
      setShowNav(false)
    }
  }

  const handleClick = useCallback(
    e => {
      if (nodeNav.current && nodeNav.current.contains(e.target)) {
        // inside Nav
        return
      } else if (nodeBusImage.current && nodeBusImage.current.contains(e.target)) {
        // inside Bus Image in Header
        return setShowNav(!showNav)
      } else if (nodeMenuImage.current && nodeMenuImage.current.contains(e.target)) {
        // inside Menu Image in Header
        return setShowNav(!showNav)
      }
      // outside click
      setShowNav(false)
    },
    [showNav]
  )

  useEffect(() => {
    // add when mounted
    document.addEventListener('click', handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="app-wrapper">
          <header className={classNameHeader}>
            <Header busImageRef={nodeBusImage} menuImageRef={nodeMenuImage} showNav={showNav} ssss={'sdsdsd'} />
          </header>
          <div className="container">
            <div className={classNameMainContent}>
              {showNav ? (
                <div className={сlassNameNavBar} ref={nodeNav}>
                  <Navbar onClickHandler={toggleNavbar} />
                </div>
              ) : null}
              <Route path="/" exact component={BusPageContainer} />
              <Route path="/cardExpiration" exact component={CardExpirationContainer} />
              <Route path="/stop/:stopNumberUrl" exact>
                <BusInfoContainer />
              </Route>
              <Route path="/settings" exact component={SettingsContainer} />
              <Route path="/maps" exact>
                <Maps showNav={showNav} setShowNav={setShowNav} settings={settings} />
              </Route>
              <Route path="/maps/:mapUrl" exact>
                <MapItem showNav={showNav} setShowNav={setShowNav} settings={settings} />
              </Route>
              <Route path="/map-line/:transportType/:number">
                <MapingLineContainer showNav={showNav} setShowNav={setShowNav} />
              </Route>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
