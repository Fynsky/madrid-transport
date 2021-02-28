import { connect } from 'react-redux'
import CardExpiration from './CardExpiration'
import { getDataCardExpirationThunk } from '../../Redux/cardExpirationReducer'

const mapStateToProps = state => {
  return {
    cardExpiration: state.cardExpiration,
    settings: state.settings,
  }
}
const mapDispatchToProps = {
  getDataCardExpiration: getDataCardExpirationThunk,
}

const CardExpirationContainer = connect(mapStateToProps, mapDispatchToProps)(CardExpiration)

export default CardExpirationContainer
