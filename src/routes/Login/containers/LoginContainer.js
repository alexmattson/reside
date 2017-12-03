import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'

import { UserIsNotAuthenticated } from 'utils/router'
import { firebaseConnect } from 'react-redux-firebase'

import { SIGNUP_PATH } from 'constants'
import LoginForm from '../components/LoginForm'

import classes from './LoginContainer.scss'
import withNotifications from 'components/decorators/withNotifications'

@withNotifications
@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
export default class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

  handleLogin = loginData => {
    return this.props.firebase
      .login(loginData)
      .then(() => {
        this.props.addSuccess('Welcome back!')
      })
      .catch(err => {
        this.props.addError(err.message)
      })
  }

  providerLogin = provider => this.handleLogin({ provider, type: 'popup' })

  render() {
    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <LoginForm onSubmit={this.handleLogin} />
        </Paper>
        <div className={classes.or}>or</div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.signup}>
          <span className={classes.signupLabel}>Need an account?</span>
          <Link className={classes.signupLink} to={SIGNUP_PATH}>
            Sign Up
          </Link>
        </div>
      </div>
    )
  }
}
