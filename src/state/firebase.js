import { getQuestionSetsFromDbAsyncAction } from './questionSetsListView';
import { getUsersListFromFirebaseAsyncAction } from './addNewUserView';
import { getUserGroupsListFromFirebaseAsyncAction } from './userGroupListView';

export const startListeningToFirebase = () => (dispatch, getState) => {
    dispatch(getQuestionSetsFromDbAsyncAction())
    dispatch(getUsersListFromFirebaseAsyncAction())
    dispatch(getUserGroupsListFromFirebaseAsyncAction())
};
