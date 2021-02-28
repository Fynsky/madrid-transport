import React from 'react'
import PropTypes from 'prop-types'

import style from './cardExpiration.module.scss'
import Tarjeta from '../../assets/images/Tarjeta.png'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

function CardData({ cardExp, settings }) {
  const lenguage = settings.systemLanguage
  return (
    <div>
      {!cardExp.isActive ? (
        <p className={style.desactivCard}>
          {stringsPatterns['Card not activated, please contact card service!'][lenguage]}
        </p>
      ) : cardExp.tickets.length ? (
        <div className={style.infoBlock}>
          <span className={style.cardType}>{cardExp.tickets[0].name}</span>
          <div>
            <span>{stringsPatterns['Last valid day'][lenguage]}</span>
            <strong>{fixDateFormat(cardExp.tickets[0].charge.lastUseDate).join(' ')}</strong>
          </div>
          <div>
            <span>{stringsPatterns['Loading day'][lenguage]}</span>
            <span>{fixDateFormat(cardExp.tickets[0].charge.purchaseDate).join(' ')}</span>
          </div>
          <div>
            <span>{stringsPatterns['Day of first use'][lenguage]}</span>
            <span>{fixDateFormat(cardExp.tickets[0].charge.firstUseDate).join(' ')}</span>
          </div>
          <div>
            <span className={style.bottomSpan}>
              {
                stringsPatterns[
                  'Note: it can take several days for these data to be updated since you loaded the card'
                ][lenguage]
              }
            </span>
          </div>
        </div>
      ) : null}
      {!cardExp.tickets.length && cardExp.isActive ? (
        <div style={{ textAlign: 'center' }}>
          <span>
            {
              stringsPatterns['The card is active, but there is no actual data on the purchased tickets '][
                lenguage
              ]
            }
          </span>
          <strong>({cardExp.cardCode})</strong>
        </div>
      ) : null}
      <hr />
      <div className={style.divImageTarjeta}>
        <div>
          {stringsPatterns['Please enter the digits of your card as shown in the example!'][lenguage]}
        </div>
        <div>
          <img src={Tarjeta} alt="Example card" />
        </div>
      </div>
    </div>
  )
}

CardData.propTypes = {
  cardExp: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

export default CardData

function fixDateFormat(str) {
  const d = new Date(str)
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(d)
  return [day, month, year]
}
