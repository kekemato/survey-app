import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

import Navigation from './Navigation/Navigation';
import CreateNewQuestionSetView from './views/CreateNewQuestionSetView'
import './css/App.css';

class App extends React.Component {
  render() {
    return (
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
                primaryText='Survey list'
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
              to='/create-new-survey'
              className='link'
            >
              <MenuItem
                primaryText='Create new survey'
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
            <Link
              to='/create-user-group'
              className='link'
            >
              <MenuItem
                primaryText='Create user group'
              >
              </MenuItem>
            </Link>
          </Navigation>
        </div>
        <div>
          <Route path="/create-new-question-set" component={CreateNewQuestionSetView} />
          {/* <Route path="/" exact={true} component={SurveyListView} />
          <Route path="/add-new-user" component={AddNewUserView} />
          <Route path="/create-user-group" component={CreateUserGroupView} /> */}
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
