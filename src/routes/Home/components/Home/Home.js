import React from 'react'
import Theme from 'theme'
import classes from './Home.scss'
import Card from 'material-ui/Card'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'
import FlatButton from 'material-ui/FlatButton'
import withNotifications from 'components/decorators/withNotifications'

const handleError = ({ addError }) => () => addError('this is an error')
const handleWarning = ({ addWarning }) => () => addWarning('this is a warning')
const handleSuccess = ({ addSuccess }) => () => addSuccess('this is a success')

const Home = props => (
  <Card>
    <div
      className={classes.container}
      style={{ color: Theme.palette.primary2Color }}>
      <div className="flex-row-center">
        <h1>Github User List</h1>
      </div>
      <div className="flex-row-center">
        <p>Alex Mattson</p>
      </div>
      <div className="flex-row-center">
        <div className={classes.section}>
          <h3>Notable Components </h3>
          <ul>
            <li>
              <b>Notification Handling</b> - A general notification handling
              system. This component is a wrapper for 'react-notifications'
              'NotificationStack' component. I have also added the
              redux/component logic for adding a sucess, error, or warning
              notification. Finally this is all wrapped up nicely in a
              withNotifications decorator that provides addError, addSuccess,
              and addWarning functions to a component's props. Try out the
              different notifications below:
              <div className="flex-row-center">
                <FlatButton
                  primary
                  label="Add an Error"
                  onClick={handleError(props)}
                />
                <FlatButton
                  primary
                  label="Add an Warning"
                  onClick={handleWarning(props)}
                />
                <FlatButton
                  primary
                  label="Add an Success"
                  onClick={handleSuccess(props)}
                />
              </div>
            </li>
            <hr />
            <li>
              <b>Table Generation</b> - A simple table generation component that
              can create a material ui table based on a column defeneition
              object.
            </li>
          </ul>
          <SyntaxHighlighter language="javascript" style={docco}>
            {`
import Table from 'components/Table'
const columns = [
  {field: 'name'},
  {field: 'login', header: 'Username', onClick: visitUser}
]
export default const UserTable = ({ users }) => (
  <Table columns={columns} data={users} />
)
            `}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  </Card>
)

export default withNotifications(Home)
