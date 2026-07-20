import React from "react"

function AsteroidCount(props) {
    return (
        <div className="card statistic">
             <p>{props.text}</p>
             <h2>{props.count}</h2>
        </div>
    )
}

export default AsteroidCount