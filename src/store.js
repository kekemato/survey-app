import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createNewQuestionSetView from './state/createNewQuestionSetView'

const reducer = combineReducers({
    createNewQuestionSetView
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);