import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import style from './BusInfo.module.scss'
import ToogleFavorite from './ToogleFavorite'
import Loader from '../assets/loader/Loader'
import RefreshBut from '../assets/images/refreshBut_2.png'
import TransportItems from './TransportItems/TransportItems'
import { stringsPatterns } from '../assets/strings/stringsPatterns'

function BusInfo(props) {
    const settings = props.settings
    const lenguage = settings.systemLanguage
    const classNameBusInfoMain = classNames(
        style.mainBusInfoPage,
        {
         [style.colorTheme]: settings.screenTheme === 'color',
         [style.darkTheme]: settings.screenTheme === 'dark',
         [style.lightTheme]: settings.screenTheme === 'light' 
        }
    )
    const { stopNumberUrl } = useParams()
    const addFavorStop = props.addFavorStop
    const removeFavorStop = props.removeFavorStop
    const error = props.busPage.error
    const loading = props.busPage.loading
    const getDataFromStopNumber = props.getDataFromStopNumber

// if there is url, then dispatch data from url:
    useEffect(() => {
        if (stopNumberUrl){
            getDataFromStopNumber(stopNumberUrl) 
        }
    }, [stopNumberUrl, getDataFromStopNumber])

    const data = props.busPage.data
    const lines = new Array (data.lines)[0] 
    const groups = getGroups(lines)
    const item = getItem(data)
    const isFavorStop = chekIsFavoriteStop(props, data)

    return (
        <div className={classNameBusInfoMain}>
            {error ? 
                    (<div className={style.errorParagraph}>{error.toString()}
                        <div>
                            { stringsPatterns['No data was received from the server...'][lenguage] } 
                        </div>
                    </div>) : null
            }
            {(loading && !error)? <div className={style.loader}><Loader/> { stringsPatterns['Loading...'][lenguage] } </div> : null}

            {Object.keys(data).length ? 
                <div>
                    <div className={style.stopNameDiv}>
                        <div>{ stringsPatterns['Stop code:'][lenguage] } 
                            <span>
                                <strong>{data.stopNumber}</strong> 
                                <img alt = 'data refresh icon' onClick={() => props.getDataFromStopNumber(stopNumberUrl)}
                                    src={RefreshBut} className={style.refreshIcon}/>
                            </span> 
                        </div>
                        <div><p>{ stringsPatterns['Stop name:'][lenguage] }</p><strong>{data.stopName}</strong></div>
                        <div>{ stringsPatterns['Stop type:'][lenguage] }<span>{data.stopType}</span></div>
                    </div>
                
                    <ToogleFavorite isFavorStop={isFavorStop} item={item} settings={settings}
                                    removeFavorStop={removeFavorStop} addFavorStop={addFavorStop}/>
                    {groups.length 
                    ? groups.map(group => 
                    <TransportItems data={group} key={group[0]} settings={settings}/>)
                    : <div style={{textAlign: "center"}}>====Actualmente sin datos====</div>}

                    <div className={style.dataAlertMessage}>
                        {data.alertMessage && data.alertMessage}
                    </div>
                </div>
            : null}        
        </div>
    )
}

BusInfo.propTypes = {
    data: PropTypes.object,
    removeFavorStop: PropTypes.func.isRequired,
    addFavorStop: PropTypes.func.isRequired
}

export default BusInfo


function getDeparturesGroups(lines) {
    const groups = {}
    lines.forEach((departure) => {
        if (groups[departure.lineNumber]) {
            groups[departure.lineNumber].push(departure)
        } else {
            groups[departure.lineNumber] = [
                departure
            ]
        }
    })
    return Object.entries(groups)
}

function chekIsFavoriteStop(props, data) {
    const favorStop = []
    if (props.savedStops.stops && Object.values(props.savedStops.stops).length > 0) {
        props.savedStops.stops.items.find((element) => {
            if (element.stopNumber === data.stopNumber) {
                favorStop.push(element)
            }
        })
    }
    return favorStop.length > 0 ? true : false
}

function getItem(data) {
    if (data) {
        return {'stopName': data.stopName, 'stopNumber': data.stopNumber, 'stopType': data.stopType}
    }
    return undefined
}

function getGroups(lines) {
    if(lines){
        return getDeparturesGroups(lines) 
    } 
    return undefined
}
