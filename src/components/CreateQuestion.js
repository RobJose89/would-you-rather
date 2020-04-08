import React, { Component } from 'react'
import { connect } from 'react-redux'
import {saveNewUserQuestion} from '../actions/shared'
import { Redirect } from 'react-router-dom'

class CreateQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }

    createQuestion = (e) => {
        e.preventDefault();

        const { authedUser, dispatch } = this.props
        const {optionOneText, optionTwoText} = this.state
        dispatch(saveNewUserQuestion(authedUser, optionOneText, optionTwoText))
        this.setState({
            toHome: true
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState({
            [name] : value
        })
    }

    render() {
        const { toHome } = this.state
        if ( toHome === true ) {
            return <Redirect to='/'/>
        }
        return (
            <div>
              <form onSubmit={this.createQuestion}>
                <h1>Create Question</h1>
                <div className="QuestionContainer">
                    <span className="QuestionDetails">
                        <div>Would You Rather:</div>
                        <div>
                            <label><input type="text" id="optionOneText" name="optionOneText" onChange={this.handleChange}/> Option One Text</label><br/>
                            <label><input type="text" id="optionTwoText" name="optionTwoText" onChange={this.handleChange}/> Option Two Text</label><br/>
                            <button className="ButtonSize" type="submit" disabled={this.state.optionOneText==='' || this.state.optionTwoText===''}>Create</button>
                        </div>
                    </span>
                </div>
              </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {

    return {
      authedUser: authedUser.id
    }
  }

export default connect(mapStateToProps)(CreateQuestion)