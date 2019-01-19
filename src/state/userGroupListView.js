import { database } from '../firebaseConfig'

const SAVE_USER_GROUP_LIST = 'UserGroupListView/SAVE_USER_GROUP_LIST'

const INITIAL_STATE = {
    userGroups: ''
}

export const getUserGroupsListFromFirebaseAsyncAction = () => (dispatch, getState) => {
    database.ref('/userGroups').on(
        'value',
        snapshot => {
            if (snapshot.val()) {
                const userGroups = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]
                }))

                dispatch(saveUserGroupsList(userGroups))
            }
        }
    )
}

const saveUserGroupsList = (userGroups) => ({
    type: SAVE_USER_GROUP_LIST,
    userGroups
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_USER_GROUP_LIST:
            return {
                ...state,
                userGroups: action.userGroups
            }
        default:
            return state
    }
}