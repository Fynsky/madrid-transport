import React from 'react'
import PropTypes from 'prop-types'

import style from './ModalFavor.module.scss'
import '../../assets/buttons/colorButtons.css'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

const del = stringsPatterns['Del']
const add = stringsPatterns['Add']
const removeStop = stringsPatterns['Remove stop from favorites']
const addStop = stringsPatterns['Add a stop to your favorites']
const areYouShureRemove = stringsPatterns['Are you sure you want to remove the stop from your favorites?']
const areYouShureAdd = stringsPatterns['Are you sure you want to add the stop to your favorites?']
const cancel = stringsPatterns['Cancel']

export default class ModalFavor extends React.Component {
  state = {
    isOpen: false,
    isFavorStop: false,
    item: this.props.item,
    lenguage: this.props.settings.systemLanguage,
  }

  toogleStopItem(e) {
    e.preventDefault()
    if (!this.state.isFavorStop) {
      this.props.addFavorStop(this.state.item)
    } else {
      this.props.removeFavorStop(this.state.item)
    }
    this.setState({ isOpen: false })
  }

  openModal(e) {
    e.preventDefault()
    this.setState({ isOpen: true })
    this.setState({ isFavorStop: this.props.isFavorStop })
    this.setState({ item: this.props.item })
  }
  closeModal(e) {
    e.preventDefault()
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <div className={style[`${this.props.settings.screenTheme}`]}>
        <button type="button" className="button red small" onClick={e => this.openModal(e)}>
          {this.props.isFavorStop ? `${del[this.state.lenguage]}` : `${add[[this.state.lenguage]]}`}
        </button>

        {this.state.isOpen && (
          <div className="modal">
            <div className={style.modalBody}>
              {this.state.isFavorStop ? (
                <h1 className={style.headH1}>{removeStop[this.state.lenguage]}</h1>
              ) : (
                <h1 className={style.headH1}>{addStop[this.state.lenguage]}</h1>
              )}
              {this.state.isFavorStop ? (
                <p className={style.paragraph}>{areYouShureRemove[this.state.lenguage]}</p>
              ) : (
                <p className={style.paragraph}>{areYouShureAdd[this.state.lenguage]}</p>
              )}
              <button type="button" className="button red small" onClick={e => this.closeModal(e)}>
                {cancel[this.state.lenguage]}
              </button>
              <button type="button" className="button red small" onClick={e => this.toogleStopItem(e)}>
                {this.state.isFavorStop ? `${del[this.state.lenguage]}` : `${add[[this.state.lenguage]]}`}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

ModalFavor.propTypes = {
  isFavorStop: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}
