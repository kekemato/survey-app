import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

import {
    deleteQuestionAsyncAction,
    addNewQuestionToFirebaseAsyncAction
} from '../../state/singleQuestionSetView';
import {
    questionTextChange,
    questionTypeChange,
    answerTextChange,
    addNewAnswerClick,

} from '../../state/createNewQuestionSetView';
import { RaisedButton } from 'material-ui';

const SingleQuestionSetView = props => {
    const singleQuestionSet = props.questionSets.find(element => element.key === props.match.params.id)
    return (
        <Paper>
            <h2>{singleQuestionSet && singleQuestionSet.questionSetName}</h2>
            <List>
                {singleQuestionSet &&
                    singleQuestionSet.questions &&
                    Object.values(singleQuestionSet.questions).map &&
                    Object.values(singleQuestionSet.questions).map((question, index) => (
                        <div key={question.timestamp}>
                            <ListItem
                                rightIconButton={
                                    <IconButton
                                        onClick={() => props.deleteQuestionAsyncAction(props.match.params.id, Object.keys(singleQuestionSet.questions)[index])
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <h3>{question.text}</h3>
                                {question.type === 'checkbox' ?
                                    question.answers && question.answers.map((answer, index) => (
                                        <RadioButtonGroup
                                        name={`question-answer-${index}`}
                                        key={`answer-${index}`}
                                        >
                                            <RadioButton
                                                disabled={true}
                                                value={answer}
                                                label={answer}
                                            />
                                        </RadioButtonGroup>
                                    ))
                                    : <TextField
                                        floatingLabelText="Type your answer"
                                        disabled={true}
                                        fullWidth={true}
                                    />
                                }
                            </ListItem>
                        </div>
                    ))
                }
            </List>
           <h3>Add new question to this question set:</h3>
            <div className="new-question-form--hidden">
                <TextField
                    floatingLabelText="Type your question"
                    fullWidth={true}
                    value={props.questionText}
                    onChange={props.questionTextChange}
                />
                <SelectField
                    value={props.questionType}
                    onChange={props.questionTypeChange}
                    floatingLabelText="Select question type"
                    fullWidth={true}
                >
                    <MenuItem value={'textField'} primaryText="Text Field" />
                    <MenuItem value={'checkbox'} primaryText="Checkbox" />
                </SelectField>
                <br />
                {props.questionType === 'checkbox' ?
                    <div className="checkbox-question-form-container">
                        <TextField
                            floatingLabelText="Type your answer to question"
                            fullWidth={true}
                            value={props.answerText}
                            onChange={props.answerTextChange}
                        />
                        <RaisedButton
                            label="Add answer"
                            onClick={props.addNewAnswerClick}
                            secondary={true}
                            fullWidth={true}
                        />
                    </div>
                    : null}
                <RaisedButton
                    label="Add new question"
                    onClick={() => props.addNewQuestionToFirebaseAsyncAction(singleQuestionSet.key )}
                    primary={true}
                    fullWidth={true}
                />
            </div>
        </Paper>
    )
}

const mapStateToProps = state => ({
    questionSets: state.questionSetsListView.questionSets,
    questionText: state.createNewQuestionSetView.questionText,
    questionType: state.createNewQuestionSetView.questionType,
    answerText: state.createNewQuestionSetView.answerText
});

const mapDispatchToProps = dispatch => ({
    deleteQuestionAsyncAction: (id, index) => dispatch(deleteQuestionAsyncAction(id, index)),
    questionTextChange: (event, text) => dispatch(questionTextChange(event, text)),
    questionTypeChange: (event, index, text) => dispatch(questionTypeChange(event, index, text)),
    answerTextChange: (event, text) => dispatch(answerTextChange(event, text)),
    addNewAnswerClick: () => dispatch(addNewAnswerClick()),
    addNewQuestionToFirebaseAsyncAction: (key) => dispatch(addNewQuestionToFirebaseAsyncAction(key)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestionSetView);