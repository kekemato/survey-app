import React from 'react';
import Paper from '../../Components/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import { deleteSurveyAsyncAction } from '../../state/surveysListView'

const SurveysListView = props => (
    <Paper>
        <h2>Surveys:</h2>
        <List>
            {props.surveys &&
                props.surveys.map &&
                props.surveys.map(survey => (
                    <ListItem
                        key={survey.key}
                        primaryText={survey.surveyName}
                        onClick={() => props.history.push(`/single-survey/${survey.key}`)}
                        rightIconButton={
                            <IconButton
                                onClick={() => props.deleteSurveyAsyncAction(survey.key)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    />
                ))
            }
        </List>
    </Paper>
)

const mapStateToProps = state => ({
    surveys: state.surveysListView.surveys
});

const mapDispatchToProps = dispatch => ({
    deleteSurveyAsyncAction: (key) => dispatch(deleteSurveyAsyncAction(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveysListView);