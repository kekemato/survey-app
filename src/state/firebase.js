import {getQuestionSetsFromDbAsyncAction} from './questionSetsListView'

export const startListeningToFirebase = () => (dispatch, getState) => {
    dispatch(getQuestionSetsFromDbAsyncAction())
}
