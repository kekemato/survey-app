import { database } from '../firebaseConfig';

const QUESTION_SET_NAME_CHANGE = "createNewQuestionSetView/QUESTION_SET_NAME_CHANGE";
const QUESTION_TEXT_CHANGE = 'createNewQuestionSetView/QUESTION_TEXT_CHANGE';
const QUESTION_TYPE_CHANGE = 'createNewQuestionSetView/QUESTION_TYPE_CHANGE';
const ANSWER_TEXT_CHANGE = 'createNewQuestionSetView/ANSWER_TEXT_CHANGE';
const ADD_NEW_ANSWER_CLICK = 'createNewQuestionSetView/ADD_NEW_ANSWER_CLICK';
const ADD_NEW_QUESTION_CLICK = 'createNewQuestionSetView/ADD_NEW_QUESTION_CLICK';
const DELETE_QUESTION = 'createNewQuestionSetView/DELETE_QUESTION';
const RESTORE_INITIAL_STATE = 'createNewQuestionSetView/RESTORE_INITIAL_STATE';

const INITIAL_STATE = {
    questionSetName: '',
    questionText: '',
    questionType: 'textField',
    answerText: '',
    answers: [],
    questions: []
};

export const addNewQuestionSetToFirebaseAsyncAction = () => (dispatch, getState) => {
    const questionSetName = getState().createNewQuestionSetView.questionSetName;
    const questions = getState().createNewQuestionSetView.questions;
    database.ref('/questionSets').push({
        questionSetName,
        questions,
    });

    dispatch(restoreInitialStateAction())
};

export const questionSetNameChange = (event, text) => ({
    type: QUESTION_SET_NAME_CHANGE,
    text
});

export const questionTextChange = (event, text) => ({
    type: QUESTION_TEXT_CHANGE,
    text
});

export const questionTypeChange = (event, index, text) => ({
    type: QUESTION_TYPE_CHANGE,
    text
});

export const answerTextChange = (event, text) => ({
    type: ANSWER_TEXT_CHANGE,
    text
});

export const addNewAnswerClick = () => ({
    type: ADD_NEW_ANSWER_CLICK
});

export const addNewQuestionClick = () => ({
    type: ADD_NEW_QUESTION_CLICK
});

export const deleteQuestion = timestamp => ({
    type: DELETE_QUESTION,
    timestamp
})

export const restoreInitialStateAction = () => ({
    type: RESTORE_INITIAL_STATE,
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QUESTION_SET_NAME_CHANGE:
            return {
                ...state,
                questionSetName: action.text
            }
        case QUESTION_TEXT_CHANGE:
            return {
                ...state,
                questionText: action.text
            }
        case QUESTION_TYPE_CHANGE:
            return {
                ...state,
                questionType: action.text
            }
        case ANSWER_TEXT_CHANGE:
            return {
                ...state,
                answerText: action.text
            }
        case ADD_NEW_ANSWER_CLICK:
            return {
                ...state,
                answers: [...state.answers, state.answerText],
                answerText: ''
            }
        case ADD_NEW_QUESTION_CLICK:
        const timestamp = Date.now()
            return {
                ...state,
                questions: [...state.questions, { text: state.questionText, type: state.questionType, answers: state.answers, timestamp }],
                questionText: '',
                questionType: 'textField',
                answerText: '',
                answers: []
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question.timestamp !== action.timestamp)
            }
        case RESTORE_INITIAL_STATE:
            return {
                questionSetName: '',
                questionText: '',
                questionType: 'textField',
                answerText: '',
                answers: [],
                questions: []
            }
        default:
            return state
    }
};