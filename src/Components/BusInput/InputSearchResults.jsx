import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Stop from '../Stop/Stop'
import '../../assets/buttons/colorButtons.css'
import style from './BusInput.module.scss'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function InputSearchResults({ searchResults, inputValue, settings }) {
  const [portion, setPortion] = useState(10)
  const lenguage = settings.systemLanguage
  const searchResultsPortion = searchResults.slice(-portion).reverse()
  const searchResultsPortionLength = searchResultsPortion.length
  const searchResultsRestLength = searchResults.length - searchResultsPortionLength
  const classNameInputSearchResultMain = classNames(style.main, {
    [style.colorTheme]: settings.screenTheme === 'color',
    [style.darkTheme]: settings.screenTheme === 'dark',
    [style.lightTheme]: settings.screenTheme === 'light',
  })
  useEffect(() => {
    setPortion(10)
  }, [inputValue])
  function handlerButtonClick(e) {
    setPortion(portion + 10)
  }

  return (
    <div className={classNameInputSearchResultMain}>
      {searchResults ? (
        <div className={style.dataFindDiv}>{stringsPatterns['Found data:'][lenguage]}</div>
      ) : null}
      {searchResults &&
        searchResultsPortion.map(item => {
          return <Stop item={item} key={item[0]} settings={settings} />
        })}
      {searchResultsRestLength ? (
        <div className={style.howMoreStopsLeftDiv}>
          <span>
            {stringsPatterns['There are more'][lenguage]} {searchResultsRestLength}{' '}
            {stringsPatterns['stops'][lenguage]}
          </span>
          <button
            type="button"
            onMouseDown={e => e.preventDefault()}
            onClick={e => handlerButtonClick(e)}
            className="red button"
          >
            {searchResultsRestLength > 10
              ? stringsPatterns['Next 10'][lenguage]
              : `Next ${searchResultsRestLength}`}
          </button>
        </div>
      ) : null}
    </div>
  )
}

InputSearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  inputValue: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
}

export default InputSearchResults
