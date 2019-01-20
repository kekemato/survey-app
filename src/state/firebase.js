import { getQuestionSetsFromDbAsyncAction } from './questionSetsListView';
import { getUsersListFromFirebaseAsyncAction } from './addNewUserView';
import { getUserGroupsListFromFirebaseAsyncAction } from './userGroupsListView';
import { getSurveysListFromFirebaseAsyncAction } from './surveysListView';

export const startListeningToFirebase = () => (dispatch, getState) => {
    dispatch(getQuestionSetsFromDbAsyncAction())
    dispatch(getUsersListFromFirebaseAsyncAction())
    dispatch(getUserGroupsListFromFirebaseAsyncAction())
    dispatch(getSurveysListFromFirebaseAsyncAction())
};
