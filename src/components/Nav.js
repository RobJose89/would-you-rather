import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav (props) {
    return (
        <nav className="Nav">
            <NavLink to='/' exact>Home</NavLink>
            <NavLink to='/add'>New Question</NavLink>
            <NavLink to='/leaderboard'>Leader Board</NavLink>
            <span>Hello {props.userName}</span>
            <NavLink to='/logout'>Logout</NavLink>
        </nav>
    )
}
