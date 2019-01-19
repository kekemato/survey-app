import React from 'react';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { RaisedButton } from 'material-ui';
import {
    addUserToUserGroup,
    removeUserFromLocalUserGroup,
    addNewUserToTheGroupAsyncAction,
    removeUserFromUserGroupAsyncAction
} from '../state/singleUserGroupView'

const SingleUserGroupView = props => {
    const singleUserGroup = props.userGroups && props.userGroups.find(element => element.key === props.match.params.id)
    return (
        <Paper>
            <h2>{singleUserGroup && singleUserGroup.userGroupName}</h2>
            <List>
                {singleUserGroup &&
                singleUserGroup.users &&
                    singleUserGroup.users.map &&
                    singleUserGroup.users.map((user, index) => (
                        <ListItem
                            key={user.key}
                            primaryText={user.userName}
                            rightIconButton={
                                <IconButton
                                    onClick={() => props.removeUserFromUserGroupAsyncAction(singleUserGroup.key, index)}
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
                label="Add new user"
                onClick={() => props.addNewUserToTheGroupAsyncAction(singleUserGroup.key, singleUserGroup.userGroupName)}
            />
        </Paper>
    )
}

const mapStateToProps = state => ({
    userGroups: state.userGroupsListView.userGroups,
    users: state.addNewUserView.users
})

const mapDispatchToProps = dispatch => ({
    addUserToUserGroup: (user) => dispatch(addUserToUserGroup(user)),
    removeUserFromLocalUserGroup: (user) => dispatch(removeUserFromLocalUserGroup(user)),
    addNewUserToTheGroupAsyncAction: (key, userGroupName) => dispatch(addNewUserToTheGroupAsyncAction(key, userGroupName)),
    removeUserFromUserGroupAsyncAction: (key, index) => dispatch(removeUserFromUserGroupAsyncAction(key, index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserGroupView)