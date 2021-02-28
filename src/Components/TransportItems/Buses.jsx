import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import style from './TransportItems.module.scss'
import imgThreeDots from '../../assets/images/three-dots-menu-png-12-transparent.png'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'
import { EMT, INTERURBAN, NOCTURNO, convertTransportTypeToNumber } from '../Stop/Stop'
import { Link } from 'react-router-dom'
import { getDataConsideringDirectionMovement } from './Cercanias'

function Buses({ arrivalData, type, settings }) {
  const postRestData = getDataConsideringDirectionMovement(arrivalData)
  return (
    <div>
      {postRestData.map(item => (
        <BusItem
          item={item}
          key={item[1][0].lineNumber + item[1][0].lineBound}
          type={type}
          settings={settings}
        />
      ))}
    </div>
  )
}

Buses.propTypes = {
  arrivalData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

function BusItem({ item, type, settings }) {
  const lenguage = settings.systemLanguage
  const [divMap, setDivMap] = useState('')
  const classNameIcon = classNames(style.numberData, {
    [style.blueBus]: type === EMT,
    [style.greenBus]: type === INTERURBAN,
    [style.nightBus]: type === NOCTURNO,
  })
  const classNamebusItemMain = classNames(style.busItem, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  const classNameHidenDivMap = classNames(style.hidenDivMap, {
    [style.hidenDivMapOpen]: divMap,
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  const transportType = convertTransportTypeToNumber(type)

  return (
    <div>
      <div className={classNamebusItemMain}>
        <div className={style.leftPart}>
          <div className={classNameIcon}>{item[1][0].lineNumber}</div>
          <div className={style.infoBlock}>
            <div>a {item[0]}</div>
            <div className={style.busesBlock}>
              <div className={style.firstBus}>
                <strong>{item[1][0].waitTime}</strong>
                <div>{item[1][0].distanceM ? item[1][0].distanceM + 'm' : null}</div>
              </div>
              {item[1][1] && (
                <div className={style.secondBus}>
                  <strong>{item[1][1].waitTime}</strong>
                  <div>{item[1][1].distanceM ? item[1][1].distanceM + 'm' : null}</div>
                </div>
              )}
              {item[1][2] && (
                <div className={style.thirdBus}>
                  <strong>{item[1][2].waitTime}</strong>
                  <div>{item[1][2].distanceM ? item[1][2].distanceM + 'm' : null}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={style.threeDots}>
          <img
            src={imgThreeDots}
            alt="call a hidden container for viewing maps line"
            onClick={() => {
              !divMap.length
                ? setDivMap(stringsPatterns['View the line on the map'][lenguage])
                : setDivMap('')
            }}
          ></img>
        </div>
      </div>
      <Link className={classNameHidenDivMap} to={`/map-line/${transportType}/${item[1][0].lineNumber}`}>
        {divMap}
      </Link>
    </div>
  )
}

BusItem.propTypes = {
  item: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

export default Buses
