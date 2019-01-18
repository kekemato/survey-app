import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { connect } from 'react-redux';

import { deleteQuestionAsyncAction } from '../../state/singleQuestionSetView'

const SingleQuestionSetView = props => {
    const singleQuestionSet = props.questionSets.find(element => element.key === props.match.params.id)
    console.log(singleQuestionSet)
    return (
        <Paper>
            <h2>{singleQuestionSet && singleQuestionSet.questionSetName}</h2>
            <List>
                {singleQuestionSet &&
                    singleQuestionSet.questions &&
                    singleQuestionSet.questions.map &&
                    singleQuestionSet.questions.map((question, index) => (
                        <div>
                            <ListItem
                                rightIconButton={
                                    <IconButton
                                        onClick={() => props.deleteQuestionAsyncAction(props.match.params.id, index)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <h3>{question.text}</h3>
                                {question.type === 'checkbox' ?
                                    question.answers && question.answers.map(answer => (
                                        <RadioButtonGroup>
                                            <RadioButton
                                                key={question.timestamp + answer.slice(0, 3)}
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
        </Paper>
    )
}

const mapStateToProps = state => ({
    questionSets: state.questionSetsListView.questionSets
});

const mapDispatchToProps = dispatch => ({
    deleteQuestionAsyncAction: (id, index) => dispatch(deleteQuestionAsyncAction(id, index))
})


export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestionSetView);