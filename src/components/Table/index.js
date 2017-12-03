import React from 'react'
import PropTypes from 'prop-types'
import {
  Table as MuiTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, isLoaded } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import _Base from 'components/_Base'
import classNames from 'classnames'

@firebaseConnect(['githubUsers'])
@connect(({ firebase, ...props }) => {
  return {
    githubUsers: dataToJS(firebase, 'githubUsers')
  }
})
export default class Table extends _Base {
  static propTypes = {
    githubUsers: PropTypes.object,
    firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired
    })
  }

  handleClick(row, col) {
    const { columns, data } = this.props
    const field = columns[col].field
    const val = data[row][field]
    columns[col].onClick && columns[col].onClick(val)
  }

  generateRow(row) {
    const { columns } = this.props
    const colValues = columns.map(col => (
      <TableRowColumn
        className={classNames({
          'cursor-pointer': col.onClick
        })}>
        {row[col.field]}
      </TableRowColumn>
    ))
    return <TableRow>{colValues}</TableRow>
  }

  generateRows() {
    const { data } = this.props

    if (!data) {
      return null
    }

    return data.map(row => this.generateRow(row))
  }

  generateHeader() {
    const { columns } = this.props
    const colHeaders = columns.map(col => (
      <TableHeaderColumn key={col.field}>
        {col.header || col.field}
      </TableHeaderColumn>
    ))
    return <TableRow>{colHeaders}</TableRow>
  }

  render() {
    const { githubUsers } = this.props

    if (!isLoaded(githubUsers)) {
      return <LoadingSpinner />
    }

    return (
      <MuiTable onCellClick={this.handleClick}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          {this.generateHeader()}
        </TableHeader>
        <TableBody displayRowCheckbox={false}>{this.generateRows()}</TableBody>
      </MuiTable>
    )
  }
}
