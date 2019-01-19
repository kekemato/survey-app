import { database } from '../firebaseConfig'
import { restoreInitialStateAction } from './createNewQuestionSetView'

export const deleteQuestionAsyncAction = (id, index) => (dispatch, getState) => {
    database.ref(`/questionSets/${id}/questions/${index}`).remove()
}

export const addNewQuestionToFirebaseAsyncAction = (id) => (dispatch, getState) => {
    const questionText = getState().createNewQuestionSetView.questionText
    const questionType = getState().createNewQuestionSetView.questionType
    let answers = getState().createNewQuestionSetView.answers
    let questionSet = getState().questionSetsListView.questionSets.find(questionSet => questionSet.key === id)
    const timestamp = Date.now()
    answers = (questionType === 'checkbox' ? answers : null)

    if (questionSet.questions) {
        questionSet.questions.push({ text: questionText, type: questionType, timestamp, answers })
    } else {
        questionSet.questions = []
        questionSet.questions.push({ text: questionText, type: questionType, timestamp, answers })
    }
    database.ref(`/questionSets/${id}/questions`).set(
        questionSet.questions
    )

    dispatch(restoreInitialStateAction())
}