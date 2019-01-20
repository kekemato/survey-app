const TOGGLE_NOTIFICATION = 'notification/TOGGLE_NOTIFICATION'

const INITIAL_STATE = {
    isNotificationOpen: false,
    notificationMessage: ''
}

export const toggleNotificationAction = message => ({
    type: TOGGLE_NOTIFICATION,
    message
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_NOTIFICATION:
            return {
                ...state,
                isNotificationOpen: !state.isNotificationOpen,
                notificationMessage: action.message || ''
            }
        default:
            return state
    }
}