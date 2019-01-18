import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'

import {
    surveyNameChange,
    questionTextChange,
    questionTypeChange,
    answerTextChange,
    addNewAnswerClick,
    addNewQuestionClick
} from '../state/createNewSurveyView'

const CreateNewSurvey = props => (
    <Paper>
        <h2>Create new survey</h2>
        <TextField
            floatingLabelText="Name your test"
            fullWidth={true}
            value={props.surveyName}
            onChange={props.surveyNameChange}
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
        >
            <MenuItem value={'textField'} primaryText="Text Field" />
            <MenuItem value={'checkbox'} primaryText="Checkbox" />
        </SelectField>
        {props.questionType === 'checkbox' ?
            <div>
                <TextField
                    floatingLabelText="Type your answer to question"
                    fullWidth={true}
                    value={props.answerText}
                    onChange={props.answerTextChange}
                />
                <RaisedButton
                    label="Add answer"
                    onClick={props.addNewAnswerClick}
                />
            </div>
            : null}
        <RaisedButton
            label="Add new question"
            onClick={props.addNewQuestionClick}
        />
        <div>
        <h3>Your questions:</h3>
        {props.questions && props.questions.map && props.questions.map(question => (
            <div
            key={question.text}
            >
                <p>{question.text}</p>
                {question.type === 'checkbox' ?
                    <RadioButtonGroup>
                        {question.answers.map(answer => (
                        <RadioButton
                        key={question + '' + answer}
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
            </div>
        ))}
        </div>
        <RaisedButton
        label="Add new survey"
        />
    </Paper>
);

const mapStateToProps = state => ({
    surveyName: state.createNewSurveyView.surveyName,
    questionText: state.createNewSurveyView.questionText,
    questionType: state.createNewSurveyView.questionType,
    answerText: state.createNewSurveyView.answerText,
    questions: state.createNewSurveyView.questions
});

const mapDispatchToProps = dispatch => ({
    surveyNameChange: (event, text) => dispatch(surveyNameChange(event, text)),
    questionTextChange: (event, text) => dispatch(questionTextChange(event, text)),
    questionTypeChange: (event, index, text) => dispatch(questionTypeChange(event, index, text)),
    answerTextChange: (event, text) => dispatch(answerTextChange(event, text)),
    addNewAnswerClick: () => dispatch(addNewAnswerClick()),
    addNewQuestionClick: () => dispatch(addNewQuestionClick())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSurvey);