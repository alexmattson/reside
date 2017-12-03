import React from 'react'
import BindIt from './BindIt'

export default class _Base extends React.Component {
  constructor(props) {
    super(props)
    BindIt(this)
  }
}
