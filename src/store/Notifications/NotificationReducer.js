import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from './NotificationConstants'

const addNotification = (state, { payload }) => {
  const { notification } = payload
  return state.concat(notification)
}

const clearNotifications = () => {
  return []
}

const ACTION_HANDLERS = {
  [ADD_NOTIFICATION]: addNotification,
  [CLEAR_NOTIFICATIONS]: clearNotifications,
}

const initialState = []
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
