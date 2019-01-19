import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { TextField, RaisedButton} from 'material-ui';
import {
    userNameChange,
    addNewUserAsyncAction
} from '../state/addNewUserView'

const AddNewUserView = props => (
    <Paper>
        <TextField
            floatingLabelText="Type user name"
            onChange={props.userNameChange}
            value={props.userName}
        />
        <RaisedButton
            label="Add new user"
            onClick={props.addNewUserAsyncAction}
        />
        <h2>Users list:</h2>
        <List>
            {props.users &&
            props.users.map &&
            props.users.map(user => (
                <ListItem
                primaryText={user.userName}
                />
            ))
            }
        </List>
    </Paper>
)

const mapStateToProps = state => ({
    userName: state.addNewUserView.userName,
    users: state.addNewUserView.users
})

const mapDispatchToProps = dispatch => ({
    userNameChange: (event, text) => dispatch(userNameChange(event, text)),
    addNewUserAsyncAction: () => dispatch(addNewUserAsyncAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUserView);