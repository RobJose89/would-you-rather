import { _getUsers, _getUser, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA.js'

export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
  
export function getUser( id ) {
    return _getUser(id)
}

export function insertUserQuestionAnswer( authedUser, questionId, answer ) {
    return _saveQuestionAnswer( authedUser, questionId, answer);
}

export function insertNewQuestion(authedUser, optionOneText, optionTwoText) {
  return _saveQuestion({author: authedUser, optionOneText, optionTwoText});
}