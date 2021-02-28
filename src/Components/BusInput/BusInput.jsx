import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import style from './BusInput.module.scss'
import '../../assets/buttons/colorButtons.css'
import star from '../../assets/images/Star2.png'
import starEmptyBlack from '../../assets/images/starEmpty.png'
import starEmptyWhite from '../../assets/images/StarWhite2.png'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

const InputSearchResults = React.lazy(() => import('./InputSearchResults'))

function BusInput({
  alert,
  setAlert,
  inputValue,
  setInputValue,
  visitedStops,
  showFavor,
  toogleFavoriteHandler,
  settings,
  allStopsJson,
  searchResults,
  getAllStops,
  setValueOfStop,
  sizeUserSreen,
}) {
  const refInput = useRef()
  const history = useHistory()
  const lenguage = settings.systemLanguage
  const classNameMain = classNames(style.main, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  const classNameInputDivMain = classNames(style.inputDiv, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  const classNameStarImage = classNames({
    [style.emptyStar]: showFavor,
    [style.fullStar]: !showFavor,
  })
  function handlerSelectChange(e) {
    refInput.current && refInput.current.focus()
    setInputValue(e.target.value)
  }
  function handlerInputValue(e) {
    setInputValue(e.currentTarget.value)
    if (!allStopsJson.length) {
      getAllStops()
    }
  }
  useEffect(() => {
    setValueOfStop(inputValue)
  }, [inputValue, setValueOfStop])

  // if the phone screen, then the list of visited stops should be reduced to 7:
  const visStops = getVisitedStopsDependingScreen(sizeUserSreen, visitedStops)
  function getVisitedStopsDependingScreen(sizeUserSreen, visitedStops) {
    if (sizeUserSreen === 'small' && visitedStops.length === 10) {
      return visitedStops.slice(-7).reverse()
    } else {
      return visitedStops.slice().reverse()
    }
  }

  useEffect(() => {
    if (sizeUserSreen === 'big') {
      // if the screen is not a phone, then focus on the Input:
      refInput.current && refInput.current.focus()
    }
  }, [sizeUserSreen])

  function onSubmitBusStop(e) {
    e.preventDefault()
    if (/^[\d-:]*$/.test(inputValue) && inputValue.trim()) {
      history.push(`/stop/${inputValue}`)
    } else {
      setAlert(stringsPatterns['The line can only contain numbers and dashes'][lenguage])
      setInputValue('')
      setTimeout(() => {
        setAlert('')
      }, 6000)
    }
  }

  return (
    <div className={classNameMain}>
      {alert ? (
        <div className={style.alert}>
          {alert}
          <div>
            <button className="red button" type="button" onClick={() => setAlert('')}>
              {stringsPatterns['Hide'][lenguage]}
            </button>
          </div>
        </div>
      ) : null}
      <div className={classNameInputDivMain}>
        <div className={style.starDiv}>
          <img
            src={showFavor ? (settings.screenTheme === 'dark' ? starEmptyWhite : starEmptyBlack) : star}
            onClick={e => toogleFavoriteHandler(e)}
            className={classNameStarImage}
            alt="star favorites"
          />
        </div>
        <form onSubmit={e => onSubmitBusStop(e)}>
          <input
            placeholder={sizeUserSreen === 'big' ? stringsPatterns['put your bus stop'][lenguage] : '...'}
            onChange={e => handlerInputValue(e)}
            type="text"
            value={inputValue}
            title={stringsPatterns['put your bus stop'][lenguage]}
            ref={refInput}
          />
          <select className={style.selectForm} onChange={e => handlerSelectChange(e)}>
            {visStops.map((x, y) => (
              <option key={y}>{x}</option>
            ))}
          </select>
          <button className="red button">{stringsPatterns['Get data'][lenguage]}</button>
        </form>
      </div>
      {searchResults.length && inputValue ? (
        <React.Suspense fallback={<p>{stringsPatterns['Loading...'][lenguage]}</p>}>
          <InputSearchResults searchResults={searchResults} inputValue={inputValue} settings={settings} />
        </React.Suspense>
      ) : inputValue && !searchResults.length ? (
        /^[\d-:]*$/.test(inputValue) ? (
          <p className={style.unfortunatelyParagraph}>
            {
              stringsPatterns['If you are looking for a stop by its number, then click the "Find" button'][
                lenguage
              ]
            }
          </p>
        ) : (
          <p className={style.unfortunatelyParagraph}>
            {stringsPatterns['Unfortunately, no such stops were found.'][lenguage]}
          </p>
        )
      ) : null}
    </div>
  )
}

BusInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  showFavor: PropTypes.bool.isRequired,
  toogleFavoriteHandler: PropTypes.func.isRequired,
}

export default BusInput
