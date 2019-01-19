import { database } from '../firebaseConfig'

const USER_NAME_CHANGE = 'addNewUserView/USER_NAME_CHANGE'
const RESTORE_INITIAL_STATE = 'addNewUserView/RESTORE_INITIAL_STATE'
const SAVE_USER_LIST = 'addNewUserView/SAVE_USER_LIST'

const INITIAL_STATE = {
    userName: '',
    users: ''
}

export  const getUsersListFromFirebaseAsyncAction = () => (dispatch, getState) => {
    database.ref('/users').on(
        'value',
        snapshot => {
            console.log(snapshot.val())
            const users = Object.entries(
                snapshot.val()
            ).map(entry => ({
                userName: entry[1],
                key: entry[0]
            }))

            dispatch(saveUserList(users))
        }
    )
}

export const addNewUserAsyncAction = () => (dispatch, getState) => {
    const user = getState().addNewUserView.userName
    database.ref('users').push(user)

    dispatch(restoreInitialState())
}

export const userNameChange = (event, text) => ({
    type: USER_NAME_CHANGE,
    text
})

const saveUserList = (users) => ({
    type: SAVE_USER_LIST,
    users
})

const restoreInitialState = () => ({
    type: RESTORE_INITIAL_STATE
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_NAME_CHANGE:
            return {
                ...state,
                userName: action.text
            }
        case SAVE_USER_LIST:
            return {
                ...state,
                users: action.users
            }
        case RESTORE_INITIAL_STATE:
            return {
                ...state,
                userName: ''
            }

        default:
            return state
    }
}