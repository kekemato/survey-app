import { database } from '../firebaseConfig'

const SURVEY_NAME_CHANGE = "createNewSurveyView/SURVEY_NAME_CHANGE"
const QUESTION_TEXT_CHANGE = 'createNewSurveyView/QUESTION_TEXT_CHANGE'
const QUESTION_TYPE_CHANGE = 'createNewSurveyView/QUESTION_TYPE_CHANGE'
const ANSWER_TEXT_CHANGE = 'createNewSurveyView/ANSWER_TEXT_CHANGE'
const ADD_NEW_ANSWER_CLICK = 'createNewSurveyView/ADD_NEW_ANSWER_CLICK'
const ADD_NEW_QUESTION_CLICK = 'createNewSurveyView/ADD_NEW_QUESTION_CLICK'
const DELETE_QUESTION = 'createNewSurveyView/DELETE_QUESTION'
const RESTORE_INITIAL_STATE = 'createNewSurveyView/RESTORE_INITIAL_STATE'

const INITIAL_STATE = {
    surveyName: '',
    questionText: '',
    questionType: '',
    answerText: '',
    answers: [],
    questions: []
};

export const addNewSurveyToFirebaseAsyncAction = () => (dispatch, getState) => {
    const surveyName = getState().createNewSurveyView.surveyName
    const questions = getState().createNewSurveyView.questions
    database.ref('/surveys').push({
        surveyName,
        questions,
    })

    dispatch(restoreInitialStateAction())
}

export const surveyNameChange = (event, text) => ({
    type: SURVEY_NAME_CHANGE,
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

const restoreInitialStateAction = () => ({
    type: RESTORE_INITIAL_STATE,
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SURVEY_NAME_CHANGE:
            return {
                ...state,
                surveyName: action.text
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
                questionType: '',
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
                surveyName: '',
                questionText: '',
                questionType: '',
                answerText: '',
                answers: [],
                questions: []
            }
        default:
            return state
    }
};