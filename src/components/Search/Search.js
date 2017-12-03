import React from 'react'
import PropTypes from 'prop-types'
import _Base from 'components/_Base'
import TextField from 'material-ui/TextField'

import classes from './Search.scss'

export default class Search extends _Base {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    placeholder: 'Search...'
  }

  state = {
    value: ''
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
    this.props.onChange(e)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render() {
    return (
      <form className={classes.search} onSubmit={this.handleSubmit}>
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          fullWidth
        />
      </form>
    )
  }
}
