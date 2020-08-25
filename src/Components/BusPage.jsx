import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useEffect } from 'react'

import style from './BusPage.module.scss'
import '../assets/buttons/colorButtons.css'
import StopsPopular from './StopsPopular/StopsPopular'
import { stringsPatterns } from '../assets/strings/stringsPatterns'
import BusInput from './BusInput/BusInput'
import FavoritesList from './FavorStops/FavoritesList'
import SortableComponent from './FavorStops/SortableList'
import starEmptyBlack from '../assets/images/starEmpty.png'
import starEmptyWhite from '../assets/images/StarWhite2.png'
import star from '../assets/images/Star2.png'

function BusPage(props) {
    const allStopsJson = props.busPage.allStopsJson
    const settings = props.settings
    const lenguage = settings.systemLanguage
    const classNameBusPageMain = classNames(
        style.main,
        {
         [style.colorTheme]: settings.screenTheme === 'color',
         [style.darkTheme]: settings.screenTheme === 'dark',
         [style.lightTheme]: settings.screenTheme === 'light' 
        }
    )
    const [inputValue, setInputValue] = useState('')
    const savedStops = props.savedStops.stops
    const myFavArr = Object.entries(savedStops)[0][1]
    const [alert, setAlert] = useState('') 
    const visitedStops = props.busPage.visitedStops
    const stopsPopular = props.busPage.stopsPopular

    // Variables and functions needed to select similar stops in the BusInput component:
    const getAllStops = props.getAllStops
    const setValueOfStop = props.setInputValue
    const searchResults = props.busPage.searchResults
    
    // Sorting Favorite Stops:
    const setSortedArray = props.setSortedArray
    const [doNeedSortArray, setDoNeedSortArray] = useState(false)
    const [buttonNameSortArray, setButtonNameSortArray] = useState(stringsPatterns['Sort'][lenguage])
    function toogleSortArrayButton() {
        if (!doNeedSortArray) {
            setDoNeedSortArray(true)
            setButtonNameSortArray(stringsPatterns['Done!'][lenguage])
        } else {
            setDoNeedSortArray(false)
            setButtonNameSortArray(stringsPatterns['Sort'][lenguage])
        }  
    }
    
    // If there are no saved ones, then your favorites will not be displayed, for example, at 1 entrance to the application:
    const [showFavor, setShowFavor] = useState((Object.values(savedStops.items).length > 0) ? true : false)
    
    // Determining the width of the device screen for changing values for the BusInput component:
    const [sizeUserSreen, setSizeUserScreen] = useState('')
    const mq = window.matchMedia( "(max-width: 500px)" );
    useEffect(() => {
        if (mq.matches) {
            // window width is at less than 500px
            setSizeUserScreen('small')
        }
        else {
            // window width is greater than 500px
            setSizeUserScreen('big')
        }
    }, [mq, setSizeUserScreen])

    // Collapse or expand My Favorites:
    function toogleFavoriteHandler() {
        if (showFavor){
            setShowFavor(!showFavor)
        } else {
            setShowFavor(!showFavor)
        }
    }
    const classNameStarImage = classNames(
        {
         [style.emptyStar]: showFavor,
         [style.fullStar]: !showFavor
        }
    )

    return (
        <div className={style.mainBusPage}>
            <BusInput alert={alert} setAlert={setAlert} inputValue={inputValue} visitedStops={visitedStops} 
                setInputValue={setInputValue} setShowFavor={setShowFavor} showFavor={showFavor}
                toogleFavoriteHandler={toogleFavoriteHandler} settings={settings} 
                getAllStops={getAllStops} searchResults={searchResults} sizeUserSreen={sizeUserSreen}
                allStopsJson={allStopsJson} setValueOfStop={setValueOfStop}/>

            <div className={classNameBusPageMain}>
                <p>{ stringsPatterns['There is no data. Select the desired stop!'][lenguage] }</p>
                <div>
                    {(showFavor)? (
                        <div className={style.divFavor}>
                            <div className={style.divHeadingFavoriteList}>
                                <div className={style.textMyFavoriteAndImageStar}>
                                    <div className={style.textMyFavorite}>{ stringsPatterns['My favotites stops:'][lenguage] }</div>  
                                    <div className={style.starDiv}>
                                        <img src={showFavor ? (settings.screenTheme === 'dark' ? starEmptyWhite : starEmptyBlack) : star} 
                                            onClick={e => toogleFavoriteHandler(e)} className={classNameStarImage} 
                                            alt='icon star my favorites' />
                                        <span> ) :</span>    
                                    </div>
                                </div>    
            
                                <div>
                                    <button type='button' onClick={() => toogleSortArrayButton()}
                                        className='red button'> {buttonNameSortArray}
                                    </button>  
                                </div>
                            </div>

                            {!doNeedSortArray ? <FavoritesList myFavArr={myFavArr} settings={settings}/> 
                            : <SortableComponent items={myFavArr} settings={settings} 
                            setSortedArray={setSortedArray}/>}
                            
                        </div>
                    ) 
                    : null}
                    <StopsPopular stopsPopular={stopsPopular} settings={settings}/>
                </div> 
            </div>
        </div>
    )
}

BusPage.propTypes = {
    savedStops: PropTypes.object.isRequired,
    visitedStops: PropTypes.array,
    stopsPopular: PropTypes.arrayOf(PropTypes.object),
    setSortedArray: PropTypes.func,
    getAllStops: PropTypes.func,
    setValueOfStop: PropTypes.func,
    searchResults: PropTypes.array
}

export default BusPage