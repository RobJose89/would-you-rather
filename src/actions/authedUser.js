import { getUser} from '../utils/api'

export const SET_AUTHED_USER = 'LOGIN_AUTHED_USER'
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER'
export const INVALID_AUTHED_USER = 'INVALID_AUTHED_USER'

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function logoutAuthedUser (id) {
  return {
    type: LOGOUT_AUTHED_USER,
    id,
  }
}

export function invalidAuthedUser ( message ) {
  return {
    type: INVALID_AUTHED_USER,
    message,
  }
}

export function login(id) {
  return (dispatch) => {
    return getUser(id)
      .then((user) => dispatch(setAuthedUser(user)))
      .catch(err => dispatch(invalidAuthedUser(err)))
  }
}