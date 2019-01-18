import { database } from '../firebaseConfig'

const SAVE_QUESTION_SETS_ACTION = 'questionSetsListView/SAVE_QUESTION_SETS_ACTION'

const INITIAL_STATE = {
    questionSets: []
}

export const getQuestionSetsFromDbAsyncAction = () => (dispatch, getState) => {
    database.ref('/questionSets').on(
        'value',
        snapshot => {
            const sets = Object.entries(
                snapshot.val()
            ).map(entry => ({
                ...entry[1],
                key: entry[0]
            }))

            dispatch(saveQuestionSetsAction(sets))
        }
    )
}

export const deleteQuestionSetAsyncAction = (key) => (dispatch, getState) => {
    database.ref(`/questionSets/${key}`).remove()
}

const saveQuestionSetsAction = sets => ({
    type: SAVE_QUESTION_SETS_ACTION,
    sets
})

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_QUESTION_SETS_ACTION:
        return {
            ...state,
            questionSets: action.sets
        }
        default:
        return state
    }
}