import React from "react"

function AsteroidCount(props) {
    return (
        <div>
             <p>{props.text}: {props.count}</p>
        </div>
    )
}

export default AsteroidCount