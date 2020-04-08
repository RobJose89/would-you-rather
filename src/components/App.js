import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import CreateQuestion from './CreateQuestion'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import Nav from './Nav'
import ShowQuestion from './ShowQuestion'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  badQID = () => {
    return (
      <h3>404 - Bad Question ID</h3>
    )
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className="App">
          { this.props.isLoggedIn !== true
          ? <Route path='/' component={Login} />
            : <div>
                <Nav userName={this.props.userName}/>
                <Route path='/logout' component={Login} />
                <Route path='/' exact component={Home} />
                <Route path='/add' component={CreateQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/question/:id' component={ShowQuestion} />
                <Route path='/badQID' component={this.badQID} />
              </div>
          }
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    isLoggedIn: (authedUser !== null && authedUser.id !== undefined),
    userName: (authedUser !== null && authedUser.id !== undefined) ? users[authedUser.id].name : null
  }
}

export default connect(mapStateToProps)(App);
