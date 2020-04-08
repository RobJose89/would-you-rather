import React, { Component } from 'react'
import { connect } from 'react-redux'
import DisplayQuestion from './DisplayQuestion'

class Home extends Component {
    toggleAnswered = (e) => {
        const clickedElement = e.target.id
        const myUnListElement = document.getElementById("unansweredList")
        const myUnTitleElement = document.getElementById("unansweredTitle")
        const myAnsListElement = document.getElementById("answeredList")
        const myAnsTitleElement = document.getElementById("answeredTitle")

        myUnTitleElement.classList.toggle("selected", clickedElement === "unansweredTitle");
        myUnListElement.classList.toggle("hidden", clickedElement === "answeredTitle")
        myAnsTitleElement.classList.toggle("selected", clickedElement === "answeredTitle");
        myAnsListElement.classList.toggle("hidden", clickedElement === "unansweredTitle")
    }

    showQuestion = (e, questionid) => {
        e.preventDefault();
        this.props.history.push(`/question/${questionid}`)
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <div>
                    <span id="answeredTitle" className="AnsweredTitle" onClick={this.toggleAnswered}>Answered</span>
                    <span id="unansweredTitle" className="UnansweredTitle selected" onClick={this.toggleAnswered}>Unanswered</span>
                </div>
                <div id="answeredList" className="answeredList hidden">
                    { this.props.answered.map((ans) => {
                        return (
                            <DisplayQuestion key={ans.id} question={ans} handleClick={this.showQuestion} buttonText='View'/>
                        )
                    })}
                </div>
                <div id="unansweredList" className="unansweredList" >
                    { this.props.unanswered.map((ans) => {
                        return (
                            <DisplayQuestion key={ans.id} question={ans} handleClick={this.showQuestion} buttonText='Vote'/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    let answered = []
    let unanswered = []

    Object.keys(questions).forEach((q) => { 
        const question = questions[q]
        question.avatarURL = users[question.author].avatarURL
        question.authorName = users[question.author].name
        if ( question.optionOne.votes.includes(authedUser.id) 
             || question.optionTwo.votes.includes(authedUser.id) ) 
        {
            answered.push(question)
        }
        else
        {
            unanswered.push(question)
        }
    })

    answered.sort((a,b) => b.timestamp - a.timestamp)
    unanswered.sort((a,b) => b.timestamp - a.timestamp)

    return {
        answered,
        unanswered,
        users,
    }
  }

export default connect(mapStateToProps)(Home)