import { connect } from 'react-redux'
import {
  addError,
  addSuccess,
  addWarning,
  clearNotifications
} from 'store/Notifications/NotificationActions'

const mapDispatchToProps = dispatch => ({
  addError(message) {
    dispatch(addError(message))
  },
  addSuccess(message) {
    dispatch(addSuccess(message))
  },
  addWarning(message) {
    dispatch(addWarning(message))
  },
  clearNotifications() {
    dispatch(clearNotifications())
  }
})

const withNotifications = Component => {
  return connect(null, mapDispatchToProps)(Component)
}

export default withNotifications
