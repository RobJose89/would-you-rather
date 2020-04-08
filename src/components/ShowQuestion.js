import React, { Component } from 'react'
import { connect } from 'react-redux'
import DisplayQuestion from './DisplayQuestion'
import DisplayResult from './DisplayResult'
import { saveUserQuestionAnswer } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class ShowQuestion extends Component {
    state = {
        toHome: false
    }

    answerQuestion = (e, answer) => {
        e.preventDefault();

        const { authedUser, question, dispatch } = this.props
     
        dispatch(saveUserQuestionAnswer(authedUser, question.id, answer))

        this.setState(() => ({
            toHome: true
        }))
    }

    render() {
        const { badQID, question, didVote } = this.props
        const { toHome } = this.state
        
        if ( badQID === true ) {
            return <Redirect to='/badQID'/>
        }

        if ( toHome === true ) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                {didVote && (
                    <div>
                        <h1>Show Result</h1>
                        <DisplayResult question={question}/>
                    </div>
                )}
                {!didVote && (
                    <div>
                        <h1>Show Question</h1>
                        <DisplayQuestion question={question} letVote={!didVote} handleClick={didVote ? null : this.answerQuestion}/>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions,users }, props) {
    const { id } = props.match.params
    const question = questions[id]
    let didVote = false
    const badQID = question === undefined

    if (!badQID) {
        question.authorName = users[question.author].name
        question.avatarURL = users[question.author].avatarURL
        didVote = question.optionOne.votes.includes(authedUser.id) 
          || question.optionTwo.votes.includes(authedUser.id)
    }

    return {
      badQID,
      question,
      didVote,
      authedUser: authedUser.id
    }
  }
  
export default connect(mapStateToProps)(ShowQuestion)