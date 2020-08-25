import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import style from './TransportItems.module.scss'
import imgThreeDots from '../../assets/images/three-dots-menu-png-12-transparent.png'
import { CERCANIAS, LIGHT_METRO, METRO, convertTransportTypeToNumber } from '../Stop/Stop'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'
import { Link } from 'react-router-dom'


export function getDataConsideringDirectionMovement(arrivalData) {
    const data = {}
    arrivalData.forEach(element => {
        if (data[element.lineBound]) {
            data[element.lineBound].push(element)
        } else {
            data[element.lineBound] = [element]
        }
    })
    return Object.entries(data)
}

function Cercanias({ arrivalData, type, settings }) {
    
    const postRestData = getDataConsideringDirectionMovement(arrivalData)
    return (
        <div>
            {postRestData.map(item =><CercaniasItem key={`${item[1][0].lineNumber} ${item[1][0].lineBound}`} 
                                                    type={type} settings={settings} item={item} />)}
        </div>
    )
}

Cercanias.propTypes = {
    arrivalData: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string.isRequired,
    postRestData: PropTypes.arrayOf(PropTypes.array)
}

export default Cercanias

function CercaniasItem({ item, type, settings }) {
    const [divMap, setDivMap] = useState('')
    const classNameCercItemMain = classNames(
        style.cercItem,
        {
         [style.colorTheme]: settings.screenTheme === 'color',
         [style.darkTheme]: settings.screenTheme === 'dark',
         [style.lightTheme]: settings.screenTheme === 'light' 
        }
    )
    const classNameHidenDivMap = classNames(
        style.hidenDivMap,
        {
         [style.hidenDivMapOpen]: divMap,
         [style.colorTheme]: settings.screenTheme === 'color',
         [style.darkTheme]: settings.screenTheme === 'dark',
         [style.lightTheme]: settings.screenTheme === 'light' 
        }
    )
    const lenguage = settings.systemLanguage
    
    const direction = item[0]
    const data = item[1]
    const lineNumber = data[0].lineNumber
    const iconClassName = getIconClassName(type, lineNumber)
    const transportType = convertTransportTypeToNumber(type)
    return (
        <div>
            <div className={classNameCercItemMain}>
                <div className={style.leftPart}>
                    <div className={iconClassName}><strong>{data[0].lineNumber}</strong></div>
                    <div className={style.infoBlock}>
                        <div>{direction}</div>
                        <div className={style.trainBlock}>
                            <div className={style.firstTrain}>
                                {(data[0] ? (
                                    <div>
                                        <strong>{data[0].waitTime}</strong>
                                        {data[0].platform && <div>Via {data[0]['platform']}</div>} 
                                    </div>
                                ) : null)}
                            </div>
                            <div className={style.secondTrain}>
                                {(data[1] ? (
                                    <div>
                                        <strong>{data[1].waitTime}</strong> 
                                        {data[1].platform && <div>Via {data[1]['platform']}</div>} 
                                    </div>
                                ) : null)}
                            </div>
                            <div className={style.thirdTrain}>
                                {(data[2] ? (
                                    <div>
                                        <strong>{data[2].waitTime}</strong> 
                                        {data[2].platform && <div>Via {data[2]['platform']}</div>} 
                                    </div>
                                ) : null)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.threeDots} >
                    <img src={imgThreeDots} alt='call a hidden container for viewing maps line'
                         onClick={() => {(!divMap.length) ? setDivMap( stringsPatterns['View the line on the map'][lenguage] ) : setDivMap('')}}>
                    </img>
                </div>
            </div>
            <Link className={classNameHidenDivMap} to={`/map-line/${transportType}/${data[0].lineNumber}`}>
                {divMap}
            </Link>
        </div>
    )
}

CercaniasItem.propTypes = {
    item: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    direction: PropTypes.string,
    lineNumber: PropTypes.string,
    iconClassName: PropTypes.string,
    data: PropTypes.array
}

function getIconClassName(type, lineNumber) {
    const iconClassName = classNames(
        style.numberData,
        {
         [style.cercaniasIcon]: type === CERCANIAS,
         [style.metroLightIcon]: type === LIGHT_METRO,
         [style.metroIcon]: type === METRO,
         [style.lineNumber1]: lineNumber === '1' || lineNumber === 'C1', 
         [style.lineNumber2]: lineNumber === '2' || lineNumber === 'C7', 
         [style.lineNumber3]: lineNumber === '3' || lineNumber === 'C5', 
         [style.lineNumber4]: lineNumber === '4', 
         [style.lineNumber5]: lineNumber === '5' || lineNumber === 'C10', 
         [style.lineNumber6]: lineNumber === '6' || lineNumber === 'C8', 
         [style.lineNumber7]: lineNumber === '7' || lineNumber === 'C9', 
         [style.lineNumber8]: lineNumber === '8' || lineNumber === 'C3A', 
         [style.lineNumber9]: lineNumber === '9' || lineNumber === 'C3', 
         [style.lineNumber10]: lineNumber === '10' || lineNumber === 'C4' || lineNumber === 'C4A' || lineNumber === 'C4B' || 
                lineNumber === 'C4 - C4A' || lineNumber === 'C4B - C4' || lineNumber === 'C4 - C4B' || lineNumber === 'C' || 
                lineNumber === 'C4A - C4', 
         [style.lineNumber11]: lineNumber === '11' || lineNumber === 'C2', 
         [style.lineNumber12]: lineNumber === '12', 
         [style.lineNumberR]: lineNumber === 'R', 
         [style.lineNumberML1]: lineNumber === 'ML1', 
         [style.lineNumberML2]: lineNumber === 'ML2', 
         [style.lineNumberML3]: lineNumber === 'ML3',
        }
    )
    return iconClassName
}