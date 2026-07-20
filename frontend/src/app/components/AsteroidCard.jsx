import React from "react"
import Image from "next/image"
import DangerAlert from "./DangerAlert"

function AsteroidCard(props) {
    return (
         <div className="card asteroid-card">
            <div className="asteroid-intro">
                <h3>{props.asteroid.name}</h3>
                <Image src="/asteroid.svg" alt="asteroid svg" width={100} height={100} />
            </div>
            <div className="container">
            <p>Estimated min diameter: {props.asteroid.estimated_diameter_min_meters} m</p>
            <p>Estimated max diameter: {props.asteroid.estimated_diameter_max_meters} m</p>
            {props.asteroid.is_potentially_hazardous_asteroid ? <DangerAlert /> : null}
            </div>
            <div>
            <p>Approach date: {props.asteroid.close_approach_date}</p>
            <p>Distance from Earth: {props.asteroid.miss_distance_km} km</p>
            <p>Velocity: {props.asteroid.velocity_kmh} km/h</p>
            </div>
        </div>
    )
}

export default AsteroidCard