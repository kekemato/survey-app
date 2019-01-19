import { database } from '../firebaseConfig'

const ADD_USER_TO_USER_GROUP = 'singleUserGroupView/ADD_USER_TO_USER_GROUP'
const REMOVE_USER_FROM_GROUP = 'singleUserGroupView/REMOVE_USER_FROM_GROUP'
const RESTORE_INITIAL_STATE = 'createUserGroupView/RESTORE_INITIAL_STATE'

const INITIAL_STATE = {
    usersInGroup: []
}

export const addNewUserToTheGroupAsyncAction = (key) => (dispatch, getState) => {
    const userGroups = getState().userGroupsListView.userGroups
    const singleUserGroup = userGroups && userGroups.find(element => element.key === key)
    const newUsers = getState().singleUserGroupView.usersInGroup
    const users = (singleUserGroup.users ? singleUserGroup.users.concat(newUsers) : newUsers)
    console.log(newUsers)
    console.log(users)
    database.ref(`userGroups/${key}`).set({
        users
    })

    dispatch(restoreInitialState())
}

export const addUserToUserGroup = (user) => ({
    type: ADD_USER_TO_USER_GROUP,
    user
})

export const removeUserFromGroup = (user) => ({
    type: REMOVE_USER_FROM_GROUP,
    user
})

const restoreInitialState = () => ({
    type: RESTORE_INITIAL_STATE
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
        case RESTORE_INITIAL_STATE:
            return {
                usersInGroup: []
            }

        default:
            return state
    }
}