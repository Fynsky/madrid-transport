import React from 'react'
import PropTypes from 'prop-types'

import './ModalCardDiv.scss'
import '../../assets/buttons/colorButtons.css'
import { stringsPatterns } from '../../assets/strings/stringsPatterns'

const cancel = stringsPatterns['Cancel']

export default class ModalCardDiv extends React.Component {
  state = {
    isOpen: false,
    value: '',
    lenguage: this.props.settings.systemLanguage,
  }
  openModal(e) {
    e.preventDefault()
    this.setState({ isOpen: true })
  }
  closeModal(e) {
    e.preventDefault()
    this.setState({ isOpen: false })
  }
  submitHandler(event) {
    this.setState({ value: event.target.value })
    this.props.setIndex(event.target.value)
    this.closeModal(event)
  }
  render() {
    return (
      <React.Fragment>
        <button type="button" className="button red small" onClick={e => this.openModal(e)}>
          {this.props.index}
        </button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <div onChange={this.submitHandler.bind(this)} className="divHolder">
                <div>
                  <input id="001" type="radio" name="001" value="001" />
                  <label htmlFor="001">001</label>
                </div>
                <div>
                  <input id="002" type="radio" name="002" value="002" />
                  <label htmlFor="002">002</label>
                </div>
                <div>
                  <input id="003" type="radio" name="003" value="003" />
                  <label htmlFor="003">003</label>
                </div>
                <div>
                  <input id="175" type="radio" name="175" value="175" />
                  <label htmlFor="175">175</label>
                </div>
                <div>
                  <input id="251" type="radio" name="251" value="251" />
                  <label htmlFor="251">251</label>
                </div>

                <button type="button" className="button red small" onClick={e => this.closeModal(e)}>
                  {cancel[this.state.lenguage]}
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

ModalCardDiv.propTypes = {
  index: PropTypes.string.isRequired,
  setIndex: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
}
