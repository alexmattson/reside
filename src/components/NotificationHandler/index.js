import React from 'react'
import { connect } from 'react-redux'
import { NotificationStack } from 'react-notification'
import { OrderedSet } from 'immutable'

import _Base from 'components/_Base'
import { getNotifications } from 'store/Notifications/NotificationSelectors'
import { clearNotifications } from 'store/Notifications/NotificationActions'

const getStyles = type => {
  const baseStyles = {
    zIndex: 1002,
    fontSize: '15px'
  }

  let background = 'black'

  switch (type) {
    case 'error':
      background = '#d9534f'
      break
    case 'success':
      background = '#5cb85c'
      break
    case 'warning':
      background = '#f0ad4e'
      break
  }

  return {
    ...baseStyles,
    background
  }
}

const mapStateToProps = state => ({
  notifications: getNotifications(state)
})

const mapDispatchToProps = dispatch => ({
  clearNotifications() {
    dispatch(clearNotifications())
  }
})

@connect(mapStateToProps, mapDispatchToProps)
class NotificationHandler extends _Base {
  state = {
    notifications: OrderedSet(),
    count: 0
  }

  componentWillReceiveProps({ notifications, clearNotifications }) {
    if (notifications.length) {
      notifications.map(notification => this.addNotification(notification))
      clearNotifications()
    }
  }

  addNotification({ message, type }) {
    const { notifications, count } = this.state
    const newCount = count + 1
    if (!(typeof message === 'string')) {
      message = 'There was an error :('
    }
    return this.setState({
      count: newCount,
      notifications: notifications.add({
        message,
        key: newCount,
        dismissAfter: 4000,
        barStyle: getStyles(type),
        onClick: () => this.removeNotification(newCount)
      })
    })
  }

  removeNotification(count) {
    const { notifications } = this.state
    this.setState({
      notifications: notifications.filter(n => n.key !== count)
    })
  }

  render() {
    return (
      <NotificationStack
        notifications={this.state.notifications.toArray()}
        onDismiss={notification =>
          this.setState({
            notifications: this.state.notifications.delete(notification)
          })
        }
      />
    )
  }
}

export default NotificationHandler
