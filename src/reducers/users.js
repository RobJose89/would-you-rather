import { RECEIVE_USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  const { authedUser, qid, answer } = action
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case SAVE_USER_ANSWER :
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case SAVE_USER_QUESTION:
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([qid])
        }     
      }
    default :
      return state
  }
}