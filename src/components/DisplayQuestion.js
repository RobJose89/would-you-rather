import React, { Component } from 'react'

class DisplayQuestion extends Component {
    state = {
        option: ''
    }
    
    vote = (e) => {
         this.setState({option: e.target.value});
    }

    render() {
        const { question, handleClick, buttonText, letVote = false } = this.props

        return (
            <div>
                <div className="AuthorName">{question.authorName} Asks:</div>
                <div className="QuestionContainer">
                    <span><img src={question.avatarURL} alt={question.authorName} width="100" height="100"/></span>
                    <span className="QuestionDetails">
                        <div>Would You Rather:</div>
                        {!letVote && (
                            <div>
                                <ul>
                                    <li>{question.optionOne.text}</li>
                                    <li>{question.optionTwo.text}</li>
                                </ul>
                                {buttonText && (<button className="ButtonSize" onClick={(e) => handleClick(e, question.id)}>{buttonText}</button>)}
                            </div>
                        )}
                        {letVote && (
                            <div>
                                <label><input type="radio" id="option" name="option" value="optionOne" onClick={this.vote}/>{question.optionOne.text}</label><br/>
                                <label><input type="radio" id="option" name="option" value="optionTwo" onClick={this.vote}/>{question.optionTwo.text}</label><br/>
                                <button className="ButtonSize" onClick={(e) => handleClick(e, this.state.option)} disabled={this.state.option===''}>Vote</button>
                            </div>
                        )}
                    </span>
                </div>
        </div>
        )
    }
}

export default DisplayQuestion