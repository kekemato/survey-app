import { getQuestionSetsFromDbAsyncAction } from './questionSetsListView';
import { getUsersListFromFirebaseAsyncAction } from './addNewUserView';
import { getUserGroupsListFromFirebaseAsyncAction } from './userGroupsListView';

export const startListeningToFirebase = () => (dispatch, getState) => {
    dispatch(getQuestionSetsFromDbAsyncAction())
    dispatch(getUsersListFromFirebaseAsyncAction())
    dispatch(getUserGroupsListFromFirebaseAsyncAction())
};
