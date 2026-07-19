"use client"
import React from "react"
import Title from "./Title";
import AsteroidCount from "./AsteroidsCount";
import AsteroidCard from "./AsteroidCard";
import {Switch} from "@mui/material"

function Dashboard({data}) {

  const [isChecked, setIsChecked] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("none");


  let displayedList = [...data.asteroids_list];

  if (isChecked) {
    displayedList = displayedList.filter((item => {
      return item.is_potentially_hazardous_asteroid
    }));
  }

  if (sortBy === "distance") {
    displayedList.sort((a, b) => a.miss_distance_km - b.miss_distance_km);
  } else if (sortBy === "velocity") {
    displayedList.sort((a, b) => b.velocity_kmh - a.velocity_kmh)
  } else if (sortBy === "diameter") {
    displayedList.sort((a, b) => b.estimated_diameter_max_meters - a.estimated_diameter_max_meters)
  }

  
  function handleChange() {
    setIsChecked(!isChecked)
  }


  function handleSorting (e) {
    const sort = e.target.value
    setSortBy(sort)
  }

  return (
    <div>
      <Title />
      <div className="card-container">
        <div className="statistics">
            <AsteroidCount text="Asteroids monitored" count={data.count} />
            <AsteroidCount text="Potentially dangerous" count={data.potentially_hazardous_asteroids_count}/>
            <AsteroidCount text="Period" count={data.period} />
        </div>

        <div className="filter">
          <Switch color="secondary" checked={isChecked} onChange={handleChange}/>
          <p>Show only dangerous</p>
          <select className="order" value={sortBy} onChange={handleSorting}>
            <option value="none">Sort By</option>
            <option value="distance">Nearest</option>
            <option value="velocity">Fastest</option>
            <option value="diameter">Biggest</option>
        </select>
        </div>
        
        {displayedList.map((item) => {
          return (
              <AsteroidCard
                key={item.id}
                asteroid={item}
              />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard