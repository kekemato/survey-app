import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'

import '../css/createNewQuestionSetView.css'

import {
    questionSetNameChange,
    questionTextChange,
    questionTypeChange,
    answerTextChange,
    addNewAnswerClick,
    addNewQuestionClick,
    deleteQuestion,
    addNewQuestionSetToFirebaseAsyncAction
} from '../state/createNewQuestionSetView'

const CreateNewQuestionSet = props => (
    <Paper class="question-set-container">
        <h2>Create new question set</h2>
        <TextField
            floatingLabelText="Name your question set"
            fullWidth={true}
            value={props.questionSetName}
            onChange={props.questionSetNameChange}
        />
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
            <div class="checkbox-question-form-container">
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
            onClick={props.addNewQuestionClick}
            primary={true}
            fullWidth={true}
        />
        <h3>Your questions:</h3>
        <List>
            {props.questions &&
                props.questions.map &&
                props.questions.map((question) => (
                    <ListItem
                        key={question.timestamp}
                        rightIconButton={
                            <IconButton
                                onClick={() => props.deleteQuestion(question.timestamp)
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <p>{question.text}</p>
                        {question.type === 'checkbox' ?
                            <RadioButtonGroup>
                                {question.answers &&
                                    question.answers.map &&
                                    question.answers.map(answer => (
                                        <RadioButton
                                            key={question.timestamp + answer.slice(0, 3)}
                                            disabled={true}
                                            value={answer}
                                            label={answer}
                                        />
                                    ))}
                            </RadioButtonGroup>
                            : <TextField
                                floatingLabelText="Type your answer"
                                disabled={true}
                                fullWidth={true}
                            />
                        }
                    </ListItem>
                ))}
        </List>
        <RaisedButton
            label="Create new question set"
            onClick={props.addNewQuestionSetToFirebaseAsyncAction}
            primary={true}
            fullWidth={true}
        />
    </Paper>
);

const mapStateToProps = state => ({
    questionSetName: state.createNewQuestionSetView.questionSetName,
    questionText: state.createNewQuestionSetView.questionText,
    questionType: state.createNewQuestionSetView.questionType,
    answerText: state.createNewQuestionSetView.answerText,
    questions: state.createNewQuestionSetView.questions
});

const mapDispatchToProps = dispatch => ({
    questionSetNameChange: (event, text) => dispatch(questionSetNameChange(event, text)),
    questionTextChange: (event, text) => dispatch(questionTextChange(event, text)),
    questionTypeChange: (event, index, text) => dispatch(questionTypeChange(event, index, text)),
    answerTextChange: (event, text) => dispatch(answerTextChange(event, text)),
    addNewAnswerClick: () => dispatch(addNewAnswerClick()),
    addNewQuestionClick: () => dispatch(addNewQuestionClick()),
    deleteQuestion: (timestamp) => dispatch(deleteQuestion(timestamp)),
    addNewQuestionSetToFirebaseAsyncAction: () => dispatch(addNewQuestionSetToFirebaseAsyncAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewQuestionSet);