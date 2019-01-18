import { database } from '../firebaseConfig'

export const deleteQuestionAsyncAction = (id, index) => (dispatch, getState) => {
    database.ref(`/questionSets/${id}/questions/${index}`).remove()
}