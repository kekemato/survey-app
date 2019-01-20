import { database } from '../firebaseConfig';

const SURVEY_NAME_CHANGE = 'createNewSurveyView/SURVEY_NAME_CHANGE';
const ADD_QUESTION_SET_TO_SURVEY = 'createNewSurveyView/ADD_QUESTION_SET_TO_SURVEY';
const REMOVE_QUESTION_SET_FROM_SURVEY = 'createNewSurveyView/REMOVE_QUESTION_SET_FROM_SURVEY';
const ADD_USER_GROUP_TO_SURVEY = 'createNewSurveyView/ADD_USER_GROUP_TO_SURVEY';
const REMOVE_USER_GROUP_FROM_SURVEY = 'createNewSurveyView/REMOVE_USER_GROUP_FROM_SURVEY';
const RESTORE_INITIAL_STATE = 'createNewSurveyView/RESTORE_INITIAL_STATE';

const INITIAL_STATE = {
    surveyName: '',
    questionSetsInSurvey: [],
    userGroupsInSurvey: []
};

export const createNewSurveyAsyncAction = () => (dispatch, getState) => {
    const surveyName = getState().createNewSurveyView.surveyName
    const questionSets = getState().createNewSurveyView.questionSetsInSurvey
    const userGroups = getState().createNewSurveyView.userGroupsInSurvey
    database.ref('surveys').push({
        surveyName,
        questionSets,
        userGroups
    });
    dispatch(restoreInitialState());
};

export const surveyNameChange = (event, text) => ({
    type: SURVEY_NAME_CHANGE,
    text
});

export const addQuestionSetToSurvey = (questionSet) => ({
    type: ADD_QUESTION_SET_TO_SURVEY,
    questionSet
});

export const removeQuestionSetFromSurvey = (key) => ({
    type: REMOVE_QUESTION_SET_FROM_SURVEY,
    key
});

export const addUserGroupToSurvey = (userGroup) => ({
    type: ADD_USER_GROUP_TO_SURVEY,
    userGroup
});

export const removeUserGroupFromSurvey = (key) => ({
    type: REMOVE_USER_GROUP_FROM_SURVEY,
    key
});

const restoreInitialState = () => ({
    type: RESTORE_INITIAL_STATE
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SURVEY_NAME_CHANGE:
            return {
                ...state,
                surveyName: action.text
            }
        case ADD_QUESTION_SET_TO_SURVEY:
            return {
                ...state,
                questionSetsInSurvey: [...state.questionSetsInSurvey, action.questionSet]
            }
        case REMOVE_QUESTION_SET_FROM_SURVEY:
            return {
                ...state,
                questionSetsInSurvey: state.questionSetsInSurvey.filter(questionSet => questionSet.key !== action.key)
            }
        case ADD_USER_GROUP_TO_SURVEY:
            return {
                ...state,
                userGroupsInSurvey: [...state.userGroupsInSurvey, action.userGroup]
            }
        case REMOVE_USER_GROUP_FROM_SURVEY:
            return {
                ...state,
                userGroupsInSurvey: state.userGroupsInSurvey.filter(userGroup => userGroup.key !== action.key)
            }
        case RESTORE_INITIAL_STATE:
            return {
                surveyName: '',
                questionSetsInSurvey: [],
                userGroupsInSurvey: []
            }
        default:
            return state
    }
};