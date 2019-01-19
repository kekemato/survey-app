import { database } from '../firebaseConfig'

const SAVE_USER_GROUP_LIST = 'UserGroupListView/SAVE_USER_GROUP_LIST'
const RESTORE_INITIAL_STATE = 'UserGroupListView/RESTORE_INITIAL_STATE'

const INITIAL_STATE = {
    userGroups: []
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

export const deleteUserGroupAsyncAction = (key) => (dispatch, getState) => {
    const userGroups = getState().userGroupsListView.userGroups;
    if (userGroups.length === 1) {
        database.ref(`/userGroups/${key}`).remove();
        dispatch(restoreInitialState());
    } else {
        database.ref(`/userGroups/${key}`).remove();
    }
};

const saveUserGroupsList = (userGroups) => ({
    type: SAVE_USER_GROUP_LIST,
    userGroups
});

const restoreInitialState = () => ({
    type: RESTORE_INITIAL_STATE
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_USER_GROUP_LIST:
            return {
                ...state,
                userGroups: action.userGroups
            }
        case RESTORE_INITIAL_STATE:
            return {
                userGroups: []
            }
        default:
            return state
    }
}