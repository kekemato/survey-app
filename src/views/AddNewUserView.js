import React from 'react';
import Paper from '../Components/Paper';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { TextField, RaisedButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import {
    userNameChange,
    addNewUserAsyncAction,
    removeUserFromUserListAsyncAction
} from '../state/addNewUserView'

const AddNewUserView = props => (
    <Paper>
        <TextField
            floatingLabelText="Type user name"
            onChange={props.userNameChange}
            value={props.userName}
            fullWidth={true}
        />
        <RaisedButton
            label="Add new user"
            onClick={props.addNewUserAsyncAction}
            primary={true}
            fullWidth={true}
            style={{
                marginTop: 10
            }}
        />
        <h2>Users list:</h2>
        <List>
            {props.users &&
                props.users.map &&
                props.users.map(user => (
                    <ListItem
                        primaryText={user.userName}
                        rightIconButton={
                            <IconButton
                                onClick={() => props.removeUserFromUserListAsyncAction(user.key)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
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
    addNewUserAsyncAction: () => dispatch(addNewUserAsyncAction()),
    removeUserFromUserListAsyncAction: (key) => dispatch(removeUserFromUserListAsyncAction(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUserView);