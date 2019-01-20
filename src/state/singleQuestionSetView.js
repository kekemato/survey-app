import { database } from '../firebaseConfig'
import { restoreInitialState } from './createNewQuestionSetView';

export const deleteQuestionAsyncAction = (id, index) => (dispatch, getState) => {
    database.ref(`/questionSets/${id}/questions/${index}`).remove()
};

export const addNewQuestionToFirebaseAsyncAction = (id) => (dispatch, getState) => {
    const questionText = getState().createNewQuestionSetView.questionText;
    const questionType = getState().createNewQuestionSetView.questionType;
    let answers = getState().createNewQuestionSetView.answers;
    const timestamp = Date.now();
    answers = (questionType === 'checkbox' ? answers : null);

    database.ref(`/questionSets/${id}/questions`).push({
        text: questionText,
        type: questionType,
        timestamp,
        answers
    });

    dispatch(restoreInitialState());
};