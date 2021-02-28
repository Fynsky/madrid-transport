import { connect } from 'react-redux'
import Settings from './Settings'
import { setThemeActionCreator, setLanguageActionCreator } from '../../Redux/settingsReducer'

const mapStateToProps = state => {
  return { settings: state.settings }
}

const mapDispatchToProps = {
  setThemeApp: setThemeActionCreator,
  setLanguageApp: setLanguageActionCreator,
}

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings)

export default SettingsContainer
