import React from 'react'

export default function ShowTotals(props) {
    const percentVote = (props.optionVotes / props.totalVotes) * 100
    return (
        <div>
            <div>{props.optionVotes} of {props.totalVotes} ({percentVote.toFixed(2)}%)</div>
        </div>
    )
}