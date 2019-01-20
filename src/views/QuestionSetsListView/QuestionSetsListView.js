import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from '../../Components/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';

import {deleteQuestionSetAsyncAction} from '../../state/questionSetsListView';

const QuestionSetsListView = props => (
    <Paper>
        {props.questionSets &&
            props.questionSets.map &&
            props.questionSets.map(questionSet => (
                <List
                key={questionSet.key}
                >
                    <ListItem
                    onClick={() => props.history.push(`/single-question-set/${questionSet.key}`)}
                        primaryText={questionSet.questionSetName}
                        rightIconButton={
                            <IconButton
                                onClick={() => props.deleteQuestionSetAsyncAction(questionSet.key)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >

                    </ListItem>
                </List>

            ))
        }
    </Paper>
);

const mapStateToProps = state => ({
    questionSets: state.questionSetsListView.questionSets
});

const mapDispatchToProps = dispatch => ({
    deleteQuestionSetAsyncAction: (key) => dispatch(deleteQuestionSetAsyncAction(key))
});


export default connect(mapStateToProps, mapDispatchToProps)(QuestionSetsListView);