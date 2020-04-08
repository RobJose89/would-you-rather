import { SET_AUTHED_USER, LOGOUT_AUTHED_USER, INVALID_AUTHED_USER } from '../actions/authedUser'

export default function authedUser (state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return action ? { id: action.id } : null
    case LOGOUT_AUTHED_USER:
      return null
    case INVALID_AUTHED_USER:
      return { message: action.message }
    default :
      return state
  }
}