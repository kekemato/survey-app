import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { TextField, RaisedButton } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import {
    userGroupNameChange,
    addUserToUserGroup,
    removeUserFromGroup,
    addNewUserGroupAsyncAction
} from '../state/createUserGroupView';

const CreateUserGroupView = props => (
    <Paper>
        <TextField
            floatingLabelText="Type user group name"
            onChange={props.userGroupNameChange}
            value={props.userGroupName}
            fullWidth={true}
        />
        <RaisedButton
            label="Add new user group"
            onClick={props.addNewUserGroupAsyncAction}
            primary={true}
        />
        <h2>Available users list:</h2>
        <List>
            {props.users &&
                props.users.map &&
                props.users.map(user => (
                    <ListItem
                        key={user.key}
                        leftCheckbox={
                            <Checkbox
                                onCheck={(event, isInputChecked) => {
                                    if (isInputChecked) {
                                        props.addUserToUserGroup(user)
                                    } else {
                                        props.removeUserFromGroup(user)
                                    }
                                }
                                }
                            />}
                        primaryText={user.userName}
                    />
                ))
            }
        </List>
    </Paper>
);

const mapStateToProps = state => ({
    userGroupName: state.createUserGroupView.userGroupName,
    users: state.addNewUserView.users
});

const mapDispatchToProps = dispatch => ({
    userGroupNameChange: (event, text) => dispatch(userGroupNameChange(event, text)),
    addUserToUserGroup: (user) => dispatch(addUserToUserGroup(user)),
    removeUserFromGroup: (user) => dispatch(removeUserFromGroup(user)),
    addNewUserGroupAsyncAction: () => dispatch(addNewUserGroupAsyncAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserGroupView);