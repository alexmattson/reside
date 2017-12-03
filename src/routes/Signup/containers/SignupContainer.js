import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { firebaseConnect, pathToJS } from 'react-redux-firebase'
import { UserIsNotAuthenticated } from 'utils/router'
import { USERS_PATH, LOGIN_PATH } from 'constants'
import SignupForm from '../components/SignupForm'
import withNotifications from 'components/decorators/withNotifications'

import classes from './SignupContainer.scss'

@withNotifications
@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))
export default class Signup extends Component {
  static propTypes = {
    firebase: PropTypes.object
  }

  handleSignup = creds => {
    this.props.firebase
      .createUser(creds, {
        email: creds.email,
        username: creds.username
      })
      .then(() => this.props.addSuccess('Thanks for signing up with our app!'))
      .catch(err => this.props.addError(err.message))
  }

  providerLogin = provider => {
    this.props.firebase
      .login({ provider, type: 'popup' })
      .then(account => this.context.router.push(USERS_PATH))
      .catch(err => this.props.addError(err.message))
  }

  render() {
    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <SignupForm onSubmit={this.handleSignup} />
        </Paper>
        <div className={classes.or}>or</div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.login}>
          <span className={classes.loginLabel}>Already have an account?</span>
          <Link className={classes.loginLink} to={LOGIN_PATH}>
            Login
          </Link>
        </div>
      </div>
    )
  }
}
