import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShowTotals from './ShowTotals'

class DisplayResult extends Component {
    render() {
        const { question, youVotedForOneOption, totalOptionOneVotes, youVotedForTwoOption, totalOptionTwoVotes, totalVotes } = this.props
        const optionOneBorderClass = "QuestionBorder" + (youVotedForOneOption ? " GreenBorder" : "")
        const optionTwoBorderClass = "QuestionBorder" + (youVotedForTwoOption ? " GreenBorder" : "")
        return (
            <div>
                <div className="AuthorName">Asked By {question.authorName}</div>
                <div className="QuestionContainer">
                    <span><img src={question.avatarURL} alt={question.authorName} width="100" height="100" samesite="None"/></span>
                    <span className="QuestionResults">
                        <div>Result:</div>
                        <div className={optionOneBorderClass}><div className="QuestionAnswer"><div>{question.optionOne.text}</div>{youVotedForOneOption &&(<div className="Checkmark">&#10003;</div>)}</div><ShowTotals optionVotes={totalOptionOneVotes} totalVotes={totalVotes}/></div>
                        <div className={optionTwoBorderClass}><div className="QuestionAnswer"><div>{question.optionTwo.text}</div>{youVotedForTwoOption &&(<div className="Checkmark">&#10003;</div>)}</div><ShowTotals optionVotes={totalOptionTwoVotes} totalVotes={totalVotes}/></div>
                    </span>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }, props) {
    return {
        question: props.question,
        youVotedForOneOption: props.question.optionOne.votes.includes(authedUser.id),
        totalOptionOneVotes: props.question.optionOne.votes.length,
        youVotedForTwoOption: props.question.optionTwo.votes.includes(authedUser.id),
        totalOptionTwoVotes: props.question.optionTwo.votes.length,
        totalVotes: props.question.optionOne.votes.length + props.question.optionTwo.votes.length
    }
}

export default connect(mapStateToProps)(DisplayResult)