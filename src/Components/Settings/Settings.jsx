import React from 'react'
import classNames from 'classnames'
import { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

import style from './Settings.module.scss'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function Settings(props) {

    const lenguage = props.settings.systemLanguage
    const classNameSettingsMain = classNames(
        style.blockItemsMain,
        {
         [style.colorTheme]: props.settings.screenTheme === 'color',
         [style.darkTheme]: props.settings.screenTheme === 'dark',
         [style.lightTheme]: props.settings.screenTheme === 'light' 
        }
    )
    const [theme, setTheme] = useState(props.settings.screenTheme)
    const setThemeApp = props.setThemeApp
    const [language, setLanguage] = useState(props.settings.systemLanguage)
    const setLanguageApp = props.setLanguageApp

    useEffect(() => {
        setThemeApp(theme)
    }, [theme, setThemeApp])

    useEffect(() => {
        setLanguageApp(language)
    }, [language, setLanguageApp])

    return (
        <div>
            <div className={classNameSettingsMain}>
                <p>{stringsPatterns['Themes:'][lenguage]}</p>
                <div onClick={() => setTheme('color')}>
                    <input type="radio" id="colorTheme" name="colorTheme" value='color' checked={theme === 'color'} onChange={() => setTheme('color')}/>
                    <label htmlFor="colorTheme">{stringsPatterns['Color'][lenguage]}</label>
                </div>
                <div onClick={() => setTheme('dark')}>
                    <input type="radio" id="darkTheme" name="darkTheme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')}/>
                    <label htmlFor="darkTheme">{stringsPatterns['Dark'][lenguage]}</label>
                </div>
                <div onClick={() => setTheme('light')}>
                    <input type="radio" id="lightTheme" name="lightTheme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')}/>
                    <label htmlFor="lightTheme">{stringsPatterns['Light'][lenguage]}</label>
                </div>
            </div>
            <div className={classNameSettingsMain}>
                <p>{stringsPatterns['Language:'][lenguage]}</p>
                <div onClick={() => setLanguage('english')}>
                    <input type="radio" id="englishItem" name="englishItem" value="englishItem" checked={language === 'english'} onChange={() => setLanguage('english')}/>
                    <label htmlFor="englishItem">{stringsPatterns['English'][lenguage]}</label>
                </div>
                <div onClick={() => setLanguage('spanish')}>
                    <input type="radio" id="spanishItem" name="spanishItem" value="spanishItem" checked={language === 'spanish'} onChange={() => setLanguage('spanish')}/>
                    <label htmlFor="spanishItem">{stringsPatterns['Spanish'][lenguage]}</label>
                </div>
                <div onClick={() => setLanguage('russian')}>
                    <input type="radio" id="russianItem" name="russianItem" value="russianItem" checked={language === 'russian'} onChange={() => setLanguage('russian')}/>
                    <label htmlFor="russianItem">{stringsPatterns['Russian'][lenguage]}</label>
                </div>
            </div>
        </div>
    )
}

Settings.propTypes = {
    setThemeApp: PropTypes.func.isRequired,
    setLanguageApp: PropTypes.func.isRequired
}

export default Settings