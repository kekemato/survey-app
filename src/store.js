import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createNewQuestionSetView from './state/createNewQuestionSetView';
import questionSetsListView from './state/questionSetsListView';
import addNewUserView from './state/addNewUserView';
import createUserGroupView from './state/createUserGroupView';
import userGroupsListView from './state/userGroupsListView';
import singleUserGroupView from './state/singleUserGroupView';
import createNewSurveyView from './state/createNewSurveyView';
import surveysListView from './state/surveysListView';

const reducer = combineReducers({
    createNewQuestionSetView,
    questionSetsListView,
    addNewUserView,
    createUserGroupView,
    userGroupsListView,
    singleUserGroupView,
    createNewSurveyView,
    surveysListView
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);