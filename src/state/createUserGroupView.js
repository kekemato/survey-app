import { database } from '../firebaseConfig'
import { toggleNotificationAction } from './notification';

const USER_GROUP_NAME_CHANGE = 'createUserGroupView/USER_GROUP_NAME_CHANGE'
const ADD_USER_TO_USER_GROUP = 'createUserGroupView/ADD_USER_TO_USER_GROUP'
const REMOVE_USER_FROM_GROUP = 'createUserGroupView/REMOVE_USER_FROM_GROUP'

const INITIAL_STATE = {
    userGroupName: '',
    usersInGroup: []
}

export const addNewUserGroupAsyncAction = () => (dispatch, getState) => {
    const userGroupName = getState().createUserGroupView.userGroupName
    const users = getState().createUserGroupView.usersInGroup

    if (userGroupName !== '') {
        const newPostRef = database.ref('userGroups').push({
            userGroupName
        });

        const postId = newPostRef.key;

        users.forEach(user => {
            database.ref(`userGroups/${postId}/users`).push({
                uuid: user.key,
                userName: user.userName
            });
        })

        dispatch(toggleNotificationAction('User group created'));
    } else {
        dispatch(toggleNotificationAction('Please name the user group'));
    }
}

export const userGroupNameChange = (event, text) => ({
    type: USER_GROUP_NAME_CHANGE,
    text
})

export const addUserToUserGroup = (user) => ({
    type: ADD_USER_TO_USER_GROUP,
    user
})

export const removeUserFromGroup = (user) => ({
    type: REMOVE_USER_FROM_GROUP,
    user
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_GROUP_NAME_CHANGE:
            return {
                ...state,
                userGroupName: action.text
            }
        case ADD_USER_TO_USER_GROUP:
            return {
                ...state,
                usersInGroup: [...state.usersInGroup, action.user]
            }
        case REMOVE_USER_FROM_GROUP:
            const newUserGroup = state.usersInGroup.filter(user => user.key !== action.user.key)
            return {
                ...state,
                usersInGroup: newUserGroup
            }
        default:
            return state
    }
}