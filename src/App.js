import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'

import Navigation from './Components/Navigation';
import CreateNewQuestionSetView from './views/CreateNewQuestionSetView';
import QuestionSetsListView from './views/QuestionSetsListView/QuestionSetsListView';
import SingleQuestionSetView from './views/QuestionSetsListView/SingleQuestionSetView';
import AddNewUserView from './views/AddNewUserView';
import CreateUserGroupView from './views/CreateUserGroupView';
import UserGroupsListView from './views/UserGroupsListView/UserGroupsListView';
import SingleUserGroupView from './views/UserGroupsListView/SingleUserGroupView';
import CreateNewSurveyView from './views/CreateNewSurveyView'
import SurveysListView from './views/SurveysListView/SurveysListView';
import SingleSurveyView from './views/SurveysListView/SingleSurveyView';
import Notification from './Components/Notification'
import { startListeningToFirebase } from './state/firebase';
import './css/App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.startListeningToFirebase()
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <Navigation
                title="surveyMe"
                keyChildProp="to">
                <Link
                  to='/'
                  className='link'
                >
                  <MenuItem
                    primaryText='Surveys list'
                  >
                  </MenuItem>
                </Link>
                <Link
                  to='/question-sets-list'
                  className='link'
                >
                  <MenuItem
                    primaryText='Question sets list'
                  >
                  </MenuItem>
                </Link>
                <Link
                  to='/user-groups-list'
                  className='link'
                >
                  <MenuItem
                    primaryText='User Groups list'
                  >
                  </MenuItem>
                </Link>
                <Link
                  to='/create-new-survey'
                  className='link'
                >
                  <MenuItem
                    primaryText='Create new survey'
                  >
                  </MenuItem>
                </Link>
                <Link
                  to='/create-new-question-set'
                  className='link'
                >
                  <MenuItem
                    primaryText='Create new question set'
                  >
                  </MenuItem>
                </Link>
                <Link
                  to='/create-user-group'
                  className='link'
                >
                  <MenuItem
                    primaryText='Create user group'
                  >
                  </MenuItem>
                </Link>
                <Link
                  to='/add-new-user'
                  className='link'
                >
                  <MenuItem
                    primaryText='Add new user'
                  >
                  </MenuItem>
                </Link>
              </Navigation>
            </div>
            <div>
              <Route path="/" exact={true} component={SurveysListView} />
              <Route path="/create-new-question-set" component={CreateNewQuestionSetView} />
              <Route path="/create-new-survey" component={CreateNewSurveyView} />
              <Route path="/question-sets-list" component={QuestionSetsListView} />
              <Route path="/user-groups-list" component={UserGroupsListView} />
              <Route path="/single-survey/:id" component={SingleSurveyView} />
              <Route path="/single-question-set/:id" component={SingleQuestionSetView} />
              <Route path="/single-user-group/:id" component={SingleUserGroupView} />
              <Route path="/add-new-user" component={AddNewUserView} />
              <Route path="/create-user-group" component={CreateUserGroupView} />
            </div>
          </div>
        </Router>
        <Notification />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  startListeningToFirebase: () => dispatch(startListeningToFirebase())
});

export default connect(null, mapDispatchToProps)(App);
