import React from 'react';
import Paper from '../../Components/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { toggleNotificationAction } from '../../state/notification'
import {
    removeQuestionSetFromSurveyAsyncAction,
    removeUserGroupFromSurveyAsyncAction,
    addQuestionSetToSurvey,
    removeQuestionSetFromLocalSurvey,
    addNewQuestionSetToTheSurveyAsyncAction,
    addUserGroupToSurvey,
    removeUserGroupFromLocalSurvey,
    addNewUserGroupToTheSurveyAsyncAction
} from '../../state/singleSurveyView'

const SingleSurveyView = props => {
    const singleSurvey = props.surveys && props.surveys.find(element => element.key === props.match.params.id)
    return (
        <Paper>
            <h2>{singleSurvey && singleSurvey.surveyName}</h2>
            <h3>Question sets:</h3>
            <List>
                {singleSurvey &&
                    singleSurvey.questionSets &&
                    Object.values(singleSurvey.questionSets).map &&
                    Object.values(singleSurvey.questionSets).map((questionSet, index) => (
                        <ListItem
                            key={questionSet.key}
                            primaryText={questionSet.questionSetName}
                            rightIconButton={
                                <IconButton
                                    onClick={() => props.removeQuestionSetFromSurveyAsyncAction(singleSurvey.key, Object.keys(singleSurvey.questionSets)[index])}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    ))
                }
            </List>
            <h3>User groups:</h3>
            <List>
                {singleSurvey &&
                    singleSurvey.userGroups &&
                    Object.values(singleSurvey.userGroups).map &&
                    Object.values(singleSurvey.userGroups).map((userGroup, index) => (
                        <ListItem
                            key={userGroup.key}
                            primaryText={userGroup.userGroupName}
                            rightIconButton={
                                <IconButton
                                    onClick={() => props.removeUserGroupFromSurveyAsyncAction(singleSurvey.key, Object.keys(singleSurvey.userGroups)[index])}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    ))
                }
            </List>
            <h3>Add new question sets to the survey:</h3>
            <List>
                {props.questionSets &&
                    props.questionSets.map &&
                    props.questionSets.map(questionSet => (
                        <ListItem
                            key={questionSet.key}
                            leftCheckbox={
                                <Checkbox
                                    onCheck={(event, isInputChecked) => {
                                        if (isInputChecked) {
                                            props.addQuestionSetToSurvey(questionSet)
                                        } else {
                                            props.removeQuestionSetFromLocalSurvey(questionSet)
                                        }
                                    }}
                                />
                            }
                            primaryText={questionSet.questionSetName}
                        />
                    ))
                }
            </List>
            <RaisedButton
                primary={true}
                label="Add new question set"
                onClick={() => {
                    if (props.questionSetsInSurvey.length !== 0) {
                        props.addNewQuestionSetToTheSurveyAsyncAction(singleSurvey.key)
                    } else {
                        props.toggleNotificationAction('Please check at least one question set')
                    }
                }}
            />
            <h3>Add new user group to the survey:</h3>
            <List>
                {props.userGroups &&
                    props.userGroups.map &&
                    props.userGroups.map(userGroup => (
                        <ListItem
                            key={userGroup.key}
                            leftCheckbox={
                                <Checkbox
                                    onCheck={(event, isInputChecked) => {
                                        if (isInputChecked) {
                                            props.addUserGroupToSurvey(userGroup)
                                        } else {
                                            props.removeUserGroupFromLocalSurvey(userGroup)
                                        }
                                    }}
                                />
                            }
                            primaryText={userGroup.userGroupName}
                        />
                    ))
                }
            </List>
            <RaisedButton
                primary={true}
                label="Add new user group"
                onClick={() => {
                    if (props.userGroupsInSurvey.length !== 0) {
                        props.addNewUserGroupToTheSurveyAsyncAction(singleSurvey.key)
                    } else {
                        props.toggleNotificationAction('Please check at least one user group')
                    }
                }}
            />
        </Paper>
    )
}

const mapStateToProps = state => ({
    surveys: state.surveysListView.surveys,
    questionSets: state.questionSetsListView.questionSets,
    userGroups: state.userGroupsListView.userGroups,
    questionSetsInSurvey: state.singleSurveyView.questionSetsInSurvey,
    userGroupsInSurvey: state.singleSurveyView.userGroupsInSurvey,
})

const mapDispatchToProps = dispatch => ({
    removeQuestionSetFromSurveyAsyncAction: (key, index) => dispatch(removeQuestionSetFromSurveyAsyncAction(key, index)),
    removeUserGroupFromSurveyAsyncAction: (key, index) => dispatch(removeUserGroupFromSurveyAsyncAction(key, index)),
    addQuestionSetToSurvey: (questionSet) => dispatch(addQuestionSetToSurvey(questionSet)),
    removeQuestionSetFromLocalSurvey: (questionSet) => dispatch(removeQuestionSetFromLocalSurvey(questionSet)),
    addNewQuestionSetToTheSurveyAsyncAction: (key) => dispatch(addNewQuestionSetToTheSurveyAsyncAction(key)),
    addUserGroupToSurvey: (userGroup) => dispatch(addUserGroupToSurvey(userGroup)),
    removeUserGroupFromLocalSurvey: (userGroup) => dispatch(removeUserGroupFromLocalSurvey(userGroup)),
    addNewUserGroupToTheSurveyAsyncAction: (key) => dispatch(addNewUserGroupToTheSurveyAsyncAction(key)),
    toggleNotificationAction: (message) => dispatch(toggleNotificationAction(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleSurveyView)