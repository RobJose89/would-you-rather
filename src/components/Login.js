import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logoutAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        loginid: 'tylermcginnis'
    }

    componentDidMount() {
        this.props.dispatch(logoutAuthedUser())
      }

    handleChange = (e) => {
        const loginid = e.target.value

        this.setState(() => ({
            loginid
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props

        dispatch(login(this.state.loginid))
    }

    render() {
        if ( this.props.history.location.pathname === '/logout'
             || this.props.history.location.pathname === '/login' ) 
        {
                 return <Redirect to='/' />
        } 

        return (
            <div>
                <h1>Login</h1>
                { this.props.message && (<div style={{color:'red'}}>{this.props.message}</div>)}
                <form onSubmit={this.handleSubmit}>
                    <select id="loginid" onChange={this.handleChange}>
                        <option value="tylermcginnis">Tyler McGinnis</option>
                        <option value="johndoe">John Doe</option>
                        <option value="sarahedo">Sarah Edo</option>
                        <option value="baduser">Bad User</option>
                    </select>
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
      message: authedUser ? authedUser.message : null
    }
  }
  
export default connect(mapStateToProps)(Login)