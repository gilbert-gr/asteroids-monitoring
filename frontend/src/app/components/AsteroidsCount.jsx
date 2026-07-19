import React from "react"

function AsteroidCount(props) {
    return (
        <div className="card statistic">
             <p>{props.text}: {props.count}</p>
        </div>
    )
}

export default AsteroidCount