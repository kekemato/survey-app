import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createNewQuestionSetView from './state/createNewQuestionSetView'
import questionSetsListView from './state/questionSetsListView'

const reducer = combineReducers({
    createNewQuestionSetView,
    questionSetsListView
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);