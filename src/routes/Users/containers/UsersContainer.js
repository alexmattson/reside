import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, isLoaded } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './UsersContainer.scss'
import _Base from 'components/_Base'
import Search from 'components/Search'
import Table from 'components/Table'
import request from 'request'
import { addError, addSuccess } from 'store/Notifications/NotificationActions'

const COLUMNS = [
  {
    header: 'Username',
    field: 'login',
    onClick: user => window.open(`https://github.com/${user}`, '_blank')
  },
  { field: 'name' },
  { field: 'public_repos' },
  { field: 'public_gists' },
  { field: 'followers' },
  { field: 'following' },
  { field: 'created_at' }
]

const mapStateToProps = ({ firebase, ...props }) => ({
  githubUsers: dataToJS(firebase, 'githubUsers')
})

const mapDispatchToProps = dispatch => ({
  addError(error) {
    dispatch(addError(error))
  },
  addSuccess(success) {
    dispatch(addSuccess(success))
  }
})

@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect(['githubUsers'])
@connect(mapStateToProps, mapDispatchToProps)
export default class Account extends _Base {
  static propTypes = {
    githubUsers: PropTypes.object,
    firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired
    })
  }

  handleSearch(user) {
    const { firebase, githubUsers, addError, addSuccess } = this.props

    if (githubUsers[user]) {
      addError(`${user} is already in the list`)
      return
    }

    // generalize this
    const url = `https://api.github.com/users/${user}`
    request(url, (err, resp, body) => {
      const data = JSON.parse(body)
      if (data.message === 'Not Found') {
        addError(`${user} could not be found`)
        return
      }
      if (!err) {
        firebase
          .ref('githubUsers')
          .child(data.login)
          .set(data, error => {
            if (error) {
              addError(error)
            } else {
              addSuccess(`${user} was added to list`)
            }
          })
      }
    })
  }

  render() {
    const { githubUsers } = this.props

    if (!isLoaded(githubUsers)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.pane}>
          <h1>Github Users</h1>
          <Search
            onSubmit={this.handleSearch}
            placeholder="Add a user's info by searching the username here..."
          />
          <Table columns={COLUMNS} data={Object.values(githubUsers)} />
        </Paper>
      </div>
    )
  }
}
