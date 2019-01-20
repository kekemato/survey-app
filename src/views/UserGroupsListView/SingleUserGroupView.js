import React from 'react';
import Paper from '../../Components/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { toggleNotificationAction } from '../../state/notification'
import {
    addUserToUserGroup,
    removeUserFromLocalUserGroup,
    addNewUserToTheGroupAsyncAction,
    removeUserFromUserGroupAsyncAction
} from '../../state/singleUserGroupView'

const SingleUserGroupView = props => {
    const singleUserGroup = props.userGroups && props.userGroups.find(element => element.key === props.match.params.id)
    return (
        <Paper>
            <h2>{singleUserGroup && singleUserGroup.userGroupName}</h2>
            <List>
                {singleUserGroup &&
                    singleUserGroup.users &&
                    Object.values(singleUserGroup.users).map &&
                    Object.values(singleUserGroup.users).map((user, index) => (
                        <ListItem
                            key={user.key}
                            primaryText={user.userName}
                            rightIconButton={
                                <IconButton
                                    onClick={() => props.removeUserFromUserGroupAsyncAction(singleUserGroup.key, Object.keys(singleUserGroup.users)[index])}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    ))
                }
            </List>
            <h3>Add new users to the group:</h3>
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
                                            props.removeUserFromLocalUserGroup(user)
                                        }
                                    }
                                    }
                                />}
                            primaryText={user.userName}
                        />
                    ))
                }
            </List>
            <RaisedButton
                primary={true}
                fullWidth={true}
                label="Add new user"
                onClick={() => {
                    if (props.usersInGroup.length !== 0) {
                    props.addNewUserToTheGroupAsyncAction(singleUserGroup.key, singleUserGroup.userGroupName)
                    } else {
                        props.toggleNotificationAction('Please check at least one user')
                    }
                }}
            />
        </Paper>
    )
}

const mapStateToProps = state => ({
    userGroups: state.userGroupsListView.userGroups,
    users: state.addNewUserView.users,
    usersInGroup: state.singleUserGroupView.usersInGroup
})

const mapDispatchToProps = dispatch => ({
    addUserToUserGroup: (user) => dispatch(addUserToUserGroup(user)),
    removeUserFromLocalUserGroup: (user) => dispatch(removeUserFromLocalUserGroup(user)),
    addNewUserToTheGroupAsyncAction: (key, userGroupName) => dispatch(addNewUserToTheGroupAsyncAction(key, userGroupName)),
    removeUserFromUserGroupAsyncAction: (key, index) => dispatch(removeUserFromUserGroupAsyncAction(key, index)),
    toggleNotificationAction: (message) => dispatch(toggleNotificationAction(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserGroupView)