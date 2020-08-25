import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './cardExpiration.module.scss'
import CardData from './CardData'
import ModalCardDiv from './ModalCardDiv'
import '../../assets/buttons/colorButtons.css'
import Tarjeta from '../../assets/images/Tarjeta.png'
import Loader from '../../assets/loader/Loader'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'


const CardExpiration = (props) => {
    const settings = props.settings
    const lenguage = settings.systemLanguage
    const classNameCardExpirationMain = classNames(
        style.cardExpiration,
        {
         [style.colorTheme]: settings.screenTheme === 'color',
         [style.darkTheme]: settings.screenTheme === 'dark',
         [style.lightTheme]: settings.screenTheme === 'light' 
        }
    )
    const cardCode = props.cardExpiration.cardCode
    // console.log('tarj1:', 001 0051337879)
    // console.log('tarj1:', 0030200186)
    // 001 0000184259
    const ind = cardCode.substring(0, 3)
    const val = cardCode.substring(3)
    const [index, setIndex] = useState(ind || '001')
    const [value, setValue] = useState(val)
    const cardExpData = props.cardExpiration.data
    const error = props.cardExpiration.error
    const loading = props.cardExpiration.loading
    const buttonRef = useRef()
    const inputRef = useRef()
    const [alert, setAlert] = useState('') 

    useEffect(() => {
        buttonRef.current && buttonRef.current.focus()
    }, [index])
    
    function onSubmitHandler(e) {
        e.preventDefault()
        if (/^[\d:]*$/.test(value) && value.trim()) {
            const numStr = index + value
            props.getDataCardExpiration(numStr)
        } else {
            setAlert('The line can only contain numbers')
            setTimeout(() => {
                setAlert('')
                setValue('')
            }, 2500);
            inputRef.current && inputRef.current.focus()
        }    
    }

    return (
        <div className={classNameCardExpirationMain}>
            {(alert) ? <div className={style.alert}>{alert}</div> : null}
            <form className={style.form} onSubmit={e => onSubmitHandler(e)}>
                <ModalCardDiv setIndex={setIndex} index={index} settings={settings}/>
                <input placeholder='eg 0030200186' onChange={(e) => setValue(e.target.value)}
                    maxLength='10' type='text'
                    // pattern="\d*"
                    value={value} ref={inputRef}
                    title="Enter your card number here"
                />
                <button ref={buttonRef} className='button blue small'>{ stringsPatterns['Find'][lenguage] }</button>
            </form>
            <div>

                {loading ? <div><Loader/> <p>{ stringsPatterns['Loading...'][lenguage] }</p></div>: null}
                {(Object.values(cardExpData).length && !Object.values(error).length && !loading) ? 
                <CardData cardExp={cardExpData} settings={settings}/> : 
                (!loading ? 
                <div className={style.divImageTarjeta}>
                    <div>
                        { stringsPatterns['Check when your subscription expires. Please enter the digits of your card as shown in the example!'][lenguage] }
                        
                    </div>
                    <div><img src={Tarjeta} alt='examle how to enter the digits' /></div>
                </div> : null)
                }
            
                {Object.values(error).length ? 
                    <div className={style.errorDiv} style={{textAlign: "center"}}>
                        { stringsPatterns['Error: You may have entered the wrong card number '][lenguage] }
                        
                        <strong>{cardCode}</strong>
                        { stringsPatterns['! Carefully check the correctness of the first 3 digits.'][lenguage] }
                        
                    </div> 
                : null}

            </div>
        </div>
    )
}

CardExpiration.propTypes = {
    getDataCardExpiration: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    cardCode: PropTypes.string
}

export default CardExpiration