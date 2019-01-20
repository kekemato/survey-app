import React from 'react';
import Paper from '../Components/Paper';
import { List, ListItem } from 'material-ui/List';
import { TextField, RaisedButton } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import {
    surveyNameChange,
    addQuestionSetToSurvey,
    removeQuestionSetFromSurvey,
    addUserGroupToSurvey,
    removeUserGroupFromSurvey,
    createNewSurveyAsyncAction
} from '../state/createNewSurveyView'

const CreateNewSurveyView = props => (
    <Paper>
        <TextField
            floatingLabelText="Name your survey"
            value={props.surveyName}
            onChange={props.surveyNameChange}
            fullWidth={true}
        />
        <h2>Available question sets:</h2>
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
                                        props.removeQuestionSetFromSurvey(questionSet.key)
                                    }
                                }
                                }
                            />}
                        primaryText={questionSet.questionSetName}
                    />
                ))
            }
        </List>
        <h2>Available user groups:</h2>
        <List>
            {props.userGroups &&
                props.userGroups.map &&
                props.userGroups.map(userGroup => (
                    <ListItem
                        key={userGroup.key}
                        primaryText={userGroup.userGroupName}
                        leftCheckbox={
                            <Checkbox
                                onCheck={(event, isInputChecked) => {
                                    if (isInputChecked) {
                                        props.addUserGroupToSurvey(userGroup)
                                    } else {
                                        props.removeUserGroupFromSurvey(userGroup.key)
                                    }
                                }
                                }
                            />}
                    />
                ))
            }
        </List>
        <RaisedButton
            primary={true}
            label="Create new survey"
            onClick={props.createNewSurveyAsyncAction}
            fullWidth={true}
        />
    </Paper>
);

const mapStateToProps = state => ({
    questionSets: state.questionSetsListView.questionSets,
    userGroups: state.userGroupsListView.userGroups,
    surveyName: state.createNewSurveyView.surveyName
});

const mapDispatchToProps = dispatch => ({
    surveyNameChange: (event, text) => dispatch(surveyNameChange(event, text)),
    addQuestionSetToSurvey: (questionSet) => dispatch(addQuestionSetToSurvey(questionSet)),
    removeQuestionSetFromSurvey: (key) => dispatch(removeQuestionSetFromSurvey(key)),
    addUserGroupToSurvey: (userGroup) => dispatch(addUserGroupToSurvey(userGroup)),
    removeUserGroupFromSurvey: (key) => dispatch(removeUserGroupFromSurvey(key)),
    createNewSurveyAsyncAction: () => dispatch(createNewSurveyAsyncAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSurveyView);