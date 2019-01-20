import { database } from '../firebaseConfig'

const SAVE_SURVEYS_LIST = 'UserGroupListView/SAVE_SURVEYS_LIST'
const RESTORE_INITIAL_STATE = 'UserGroupListView/RESTORE_INITIAL_STATE'

const INITIAL_STATE = {
    surveys: []
}

export const getSurveysListFromFirebaseAsyncAction = () => (dispatch, getState) => {
    database.ref('/surveys').on(
        'value',
        snapshot => {
            if (snapshot.val()) {
                const surveys = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]
                }))

                dispatch(saveSurveysList(surveys))
            }
        }
    )
}

export const deleteSurveyAsyncAction = (key) => (dispatch, getState) => {
    const surveys = getState().surveysListView.surveys;
    if (surveys.length === 1) {
        database.ref(`/surveys/${key}`).remove();
        dispatch(restoreInitialState());
    } else {
        database.ref(`/surveys/${key}`).remove();
    }
};

const saveSurveysList = (surveys) => ({
    type: SAVE_SURVEYS_LIST,
    surveys
});

const restoreInitialState = () => ({
    type: RESTORE_INITIAL_STATE
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SURVEYS_LIST:
            return {
                ...state,
                surveys: action.surveys
            }
        case RESTORE_INITIAL_STATE:
            return {
                surveys: []
            }
        default:
            return state
    }
}