import { database } from '../firebaseConfig'


const ADD_QUESTION_SET_TO_SURVEY = 'singleSurveyView/ADD_QUESTION_SET_TO_SURVEY';
const REMOVE_QUESTION_SET_FROM_SURVEY = 'singleSurveyView/REMOVE_QUESTION_SET_FROM_SURVEY';
const ADD_USER_GROUP_TO_SURVEY = 'singleSurveyView/ADD_USER_GROUP_TO_SURVEY';
const REMOVE_USER_GROUP_FROM_SURVEY = 'singleSurveyView/REMOVE_USER_GROUP_FROM_SURVEY';
const RESTORE_INITIAL_STATE_OF_QUESTION_SETS = 'singleSurveyView/RESTORE_INITIAL_STATE_OF_QUESTION_SETS';
const RESTORE_INITIAL_STATE_OF_USER_GROUPS = 'singleSurveyView/RESTORE_INITIAL_STATE_OF_USER_GROUPS';

const INITIAL_STATE = {
    questionSetsInSurvey: [],
    userGroupsInSurvey: []
};

export const removeQuestionSetFromSurveyAsyncAction = (key, index) => (dispatch, getState) => {
    database.ref(`/surveys/${key}/questionSets/${index}`).remove()
};

export const removeUserGroupFromSurveyAsyncAction = (key, index) => (dispatch, getState) => {
    database.ref(`/surveys/${key}/userGroups/${index}`).remove()
};

export const addNewQuestionSetToTheSurveyAsyncAction = (key) => (dispatch, getState) => {
    const questionSetsInSurvey = getState().singleSurveyView.questionSetsInSurvey;

    questionSetsInSurvey.forEach(questionSet => {
        database.ref(`surveys/${key}/questionSets`).push(
            questionSet
        );
    });

    dispatch(restoreInitialStateOfQuestionSets());
};

export const addNewUserGroupToTheSurveyAsyncAction = (key) => (dispatch, getState) => {
    const userGroupsInSurvey = getState().singleSurveyView.userGroupsInSurvey;

    userGroupsInSurvey.forEach(userGroup => {
        database.ref(`surveys/${key}/userGroups`).push(
            userGroup
        );
    });

    dispatch(restoreInitialStateOfUserGroups());
}

export const addQuestionSetToSurvey = (questionSet) => ({
    type: ADD_QUESTION_SET_TO_SURVEY,
    questionSet
})
export const removeQuestionSetFromLocalSurvey = (questionSet) => ({
    type: REMOVE_QUESTION_SET_FROM_SURVEY,
    questionSet
})

export const addUserGroupToSurvey = (userGroup) => ({
    type: ADD_USER_GROUP_TO_SURVEY,
    userGroup
})

export const removeUserGroupFromLocalSurvey = (userGroup) => ({
    type: REMOVE_USER_GROUP_FROM_SURVEY,
    userGroup
})

const restoreInitialStateOfQuestionSets = () => ({
    type: RESTORE_INITIAL_STATE_OF_QUESTION_SETS
})

const restoreInitialStateOfUserGroups = () => ({
    type: RESTORE_INITIAL_STATE_OF_USER_GROUPS
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_QUESTION_SET_TO_SURVEY:
            return {
                ...state,
                questionSetsInSurvey: [...state.questionSetsInSurvey, action.questionSet]
            }
        case REMOVE_QUESTION_SET_FROM_SURVEY:
            const newQuestionSetsInSurvey = state.questionSetsInSurvey.filter(questionSet => questionSet.key !== action.questionSet.key)
            return {
                ...state,
                questionSetsInSurvey: newQuestionSetsInSurvey
            }
        case ADD_USER_GROUP_TO_SURVEY:
            return {
                ...state,
                userGroupsInSurvey: [...state.userGroupsInSurvey, action.userGroup]
            }
        case REMOVE_USER_GROUP_FROM_SURVEY:
            const newUserGroupsInSurvey = state.userGroupsInSurvey.filter(userGroup => userGroup.key !== action.userGroup.key)
            return {
                ...state,
                userGroupsInSurvey: newUserGroupsInSurvey
            }
        case RESTORE_INITIAL_STATE_OF_QUESTION_SETS:
            return {
                ...state,
                questionSetsInSurvey: []
            }
        case RESTORE_INITIAL_STATE_OF_USER_GROUPS:
            return {
                ...state,
                userGroupsInSurvey: []
            }
        default:
            return state
    }
};