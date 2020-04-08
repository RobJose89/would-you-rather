import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render() {
        return (
            <div>
                <h1>Leader Board</h1>
                { this.props.leaders.map((leader) => {
                    return (
                        <div key={leader.id} className="LeaderBoard">
                            <span>
                                <img src={leader.avatarURL} alt={leader.name} width="100" height="100" />
                            </span>
                            <span className="LeaderBoardDetails">
                                <div>
                                    {leader.name}
                                </div>
                                <div>
                                    Asked: {leader.created}
                                </div>
                                <div>
                                    Answered: {leader.answered}
                                </div>
                            </span>
                            <span className="LeaderBoardTotal">
                                <div><u>Score</u></div>
                                <div>{leader.created + leader.answered}</div>
                            </span>
                            <br/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    let leaders = Object.keys(users).map((user) => { 
        return {id: users[user].id, name: users[user].name, avatarURL: users[user].avatarURL, answered: Object.keys(users[user].answers).length, created: users[user].questions.length}})

    leaders.sort((a,b) => {
        return (b.answered + b.created) - (a.answered + a.created) 
    })

    return {
      leaders
    }
  }

export default connect(mapStateToProps)(LeaderBoard)