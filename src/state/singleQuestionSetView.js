import { database } from '../firebaseConfig'
import { restoreInitialStateAction } from './createNewQuestionSetView';

export const deleteQuestionAsyncAction = (id, index) => (dispatch, getState) => {
    database.ref(`/questionSets/${id}/questions/${index}`).remove()
};

export const addNewQuestionToFirebaseAsyncAction = (id) => (dispatch, getState) => {
    const questionText = getState().createNewQuestionSetView.questionText;
    const questionType = getState().createNewQuestionSetView.questionType;
    let answers = getState().createNewQuestionSetView.answers;
    const questionSet = getState().questionSetsListView.questionSets.find(questionSet => questionSet.key === id);
    let newQuestionSet = {}
    const timestamp = Date.now();
    answers = (questionType === 'checkbox' ? answers : null);

    questionSet.questions ?
        newQuestionSet.questions = questionSet.questions.concat({ text: questionText, type: questionType, timestamp, answers })
        : newQuestionSet.questions = [{ text: questionText, type: questionType, timestamp, answers }]

    database.ref(`/questionSets/${id}/questions`).set(
        newQuestionSet.questions
    );

    dispatch(restoreInitialStateAction());
};