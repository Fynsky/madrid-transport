import React from 'react'
import classNames from 'classnames'

import style from './Stop.module.scss'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'
import blueBus from '../../assets/images/blueBus2.png'  
import greenBus from '../../assets/images/greenBus2.png' 
import metro from '../../assets/images/metro.png' 
import renfe from '../../assets/images/renfe.png'
import metroLight from '../../assets/images/metroLight.svg' 
import { useHistory } from 'react-router-dom'



export const INTERURBAN = 'INTERURBAN'
export const URBAN = 'URBAN'
export const EMT = 'EMT'
export const NOCTURNO = 'NOCTURNO'
export const METRO = 'METRO'
export const LIGHT_METRO = 'LIGHT_METRO'
export const CERCANIAS = 'CERCANIAS'

function Stop({ item, settings }) {
    const history = useHistory()
    const lenguage = settings.systemLanguage
    const classNameStop = classNames(
        style.stopMain,
        {
         [style.colorTheme]: settings.screenTheme === 'color',
         [style.darkTheme]: settings.screenTheme === 'dark',
         [style.lightTheme]: settings.screenTheme === 'light'
        }
    )
    const type = getTypeOfStop(item[0])
    const icon = getIconFromTypeStop(type)
    const wordDefinition = getWordDefinitionFromTypeStop(type, lenguage)
    return (
        <div className={classNameStop} onClick={() => history.push(`/stop/${item[0]}`)}>
            <div className={style.stopInfoBlock}>
                <div><img src={icon} alt='icon of stop' /></div>
                <div>
                    <div>{item[1]}</div>
                    <div className={style.wordDefinition}>{wordDefinition} {item[4].join(", ")}</div>
                </div>
            </div>
            <strong>{item[0]}</strong>
        </div>
    )
}

export default Stop

export function getTypeOfStop(numStop) {  
    if (numStop.indexOf('-') === 1 || numStop.indexOf('-') === 2){
        if(numStop.indexOf('5') === 0) {
            return CERCANIAS
        } else if (numStop.indexOf('4') === 0) {
            return METRO
        } else if (numStop.indexOf('1') === 0 && numStop.indexOf('0') === 1) {
            return LIGHT_METRO
        } else if (numStop.indexOf('8') === 0){
            return INTERURBAN
        } else if (numStop.indexOf('6') === 0){
            return EMT
        }
        // URBAN ??!!

    } else if (numStop.length <= 4) {
        return EMT
    } else {
        return INTERURBAN
    }
}

export function getIconFromTypeStop(type) {
    if (type === CERCANIAS){
        return renfe
    } else if (type === METRO) {
        return metro
    } else if (type === EMT){
        return blueBus
    } else if (type === INTERURBAN){
        return greenBus
    } else if (type === URBAN){
        return greenBus
    }else if (type === LIGHT_METRO){
        return metroLight
    }
}

export function getWordDefinitionFromTypeStop(type, lenguage) {
    if (type === CERCANIAS){
        return stringsPatterns['Lines:'][lenguage] 
    } else if (type === METRO) {
        return stringsPatterns['Lines:'][lenguage]
    } else if (type === EMT){
        return stringsPatterns['Buses:'][lenguage]
    } else if (type === INTERURBAN){
        return stringsPatterns['Buses:'][lenguage]
    } else if (type === URBAN){
        return stringsPatterns['Buses:'][lenguage]
    } else if (type === LIGHT_METRO){
        return stringsPatterns['Lines:'][lenguage]
    }
}

export function convertTransportTypeToNumber(type) {
    if (type === EMT) {
      return 6
    } else if (type === INTERURBAN) {
      return 8
    } else if (type === URBAN) {
      return 8
    } else if (type === METRO) {
      return 4
    } else if (type === CERCANIAS) {
      return 5
    } else if (type === LIGHT_METRO) {
      return 10
    }
}