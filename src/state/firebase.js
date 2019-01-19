import { getQuestionSetsFromDbAsyncAction } from './questionSetsListView';
import { getUsersListFromFirebaseAsyncAction } from './addNewUserView';

export const startListeningToFirebase = () => (dispatch, getState) => {
    dispatch(getQuestionSetsFromDbAsyncAction())
    dispatch(getUsersListFromFirebaseAsyncAction())
};
