import { database } from '../firebaseConfig'

const SAVE_QUESTION_SETS_ACTION = 'questionSetsListView/SAVE_QUESTION_SETS_ACTION'
const RESTORE_INITIAL_STATE = 'questionSetsListView/RESTORE_INITIAL_STATE'

const INITIAL_STATE = {
    questionSets: []
}

export const getQuestionSetsFromDbAsyncAction = () => (dispatch, getState) => {
    database.ref('/questionSets').on(
        'value',
        snapshot => {
            if (snapshot.val()) {
                const sets = Object.entries(
                    snapshot.val()
                ).map(entry => ({
                    ...entry[1],
                    key: entry[0]
                }))

                dispatch(saveQuestionSetsAction(sets))
            }
        }
    )
}

export const deleteQuestionSetAsyncAction = (key) => (dispatch, getState) => {
    const questionSets = getState().questionSetsListView.questionSets
    if (questionSets.length === 1) {
        database.ref(`/questionSets/${key}`).remove()
        dispatch(restoreInitialState())
    } else {
        database.ref(`/questionSets/${key}`).remove()
    }
}

const saveQuestionSetsAction = sets => ({
    type: SAVE_QUESTION_SETS_ACTION,
    sets
})

const restoreInitialState = () => ({
    type: RESTORE_INITIAL_STATE
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_QUESTION_SETS_ACTION:
            return {
                ...state,
                questionSets: action.sets
            }
        case RESTORE_INITIAL_STATE:
            return {
                questionSets: []
            }
        default:
            return state
    }
}