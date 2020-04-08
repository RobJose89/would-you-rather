import { getInitialData, insertUserQuestionAnswer, insertNewQuestion } from '../utils/api'
import { receiveUsers, saveUserAnswer, saveUserQuestion } from './users'
import { receiveQuestions, saveQuestionAnswer, saveQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export function saveUserQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading())

    return insertUserQuestionAnswer({authedUser, qid, answer}).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, answer))
      dispatch(saveUserAnswer(authedUser, qid, answer))
      dispatch(hideLoading())
    })
  }
}

export function saveNewUserQuestion( authedUser, optionOneText, optionTwoText) {
  return(dispatch) => {
    dispatch(showLoading())
    return insertNewQuestion(authedUser, optionOneText, optionTwoText).then((question) => {
      dispatch(saveQuestion(question))
      dispatch(saveUserQuestion(question.author, question.id))
      dispatch(hideLoading())
    })
  }
}