import React from "react"

function AsteroidCard(props) {
    return (
         <div>
            <h3>{props.asteroid.name}</h3>
            <p>Estimated min diameter: {props.asteroid.estimated_diameter_min_meters} m</p>
            <p>Estimated max diameter: {props.asteroid.estimated_diameter_max_meters} m</p>
            <p>Approach date: {props.asteroid.close_approach_date}</p>
            <p>Distance from Earth: {props.asteroid.miss_distance_km} km</p>
            <p>Velocity: {props.asteroid.velocity_kmh} km/h</p>
            {props.asteroid.is_potentially_hazardous_asteroid ? <p>Potentially dangerous!</p> : null}
        </div>
    )
}

export default AsteroidCard