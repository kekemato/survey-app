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
    removeUserFromGroup,
    addNewUserToTheGroupAsyncAction
} from '../state/singleUserGroupView'

const SingleUserGroupView = props => {
    const singleUserGroup = props.userGroups && props.userGroups.find(element => element.key === props.match.params.id)
    return (
        <Paper>
            <h2>{singleUserGroup.userGroupName}</h2>
            <List>
                {singleUserGroup.users &&
                    singleUserGroup.users.map &&
                    singleUserGroup.users.map(user => (
                        <ListItem
                            key={user.key}
                            primaryText={user.userName}
                            rightIconButton={
                                <IconButton
                                    onClick={() => { }}
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
            <RaisedButton
            label="Add new user"
            onClick={() => props.addNewUserToTheGroupAsyncAction(singleUserGroup.key)}
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
    removeUserFromGroup: (user) => dispatch(removeUserFromGroup(user)),
    addNewUserToTheGroupAsyncAction: (key) => dispatch(addNewUserToTheGroupAsyncAction(key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserGroupView)