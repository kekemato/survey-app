import React from 'react';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';

const UserGroupsListView = props => (
    <Paper>
        <List>
            {props.userGroups &&
            props.userGroups.map &&
            props.userGroups.map(userGroup => (
                <ListItem
                key={userGroup.key}
                primaryText={userGroup.userGroupName}
                onClick={() => props.history.push(`/single-user-group/${userGroup.key}`)}
                rightIconButton={
                    <IconButton
                        onClick={() => {}}
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
    userGroups: state.userGroupsListView.userGroups,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(UserGroupsListView)