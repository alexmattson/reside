import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from './NotificationConstants'

export const addError = message => ({
  type: ADD_NOTIFICATION,
  payload: {
    notification: {
      message,
      type: 'error'
    }
  }
})

export const addSuccess = message => ({
  type: ADD_NOTIFICATION,
  payload: {
    notification: {
      message,
      type: 'success'
    }
  }
})

export const addWarning = message => ({
  type: ADD_NOTIFICATION,
  payload: {
    notification: {
      message,
      type: 'warning'
    }
  }
})

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
})
