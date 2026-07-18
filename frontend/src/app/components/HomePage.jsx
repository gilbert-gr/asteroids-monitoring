import React from "react"
import Title from "./Title";
import AsteroidCount from "./AsteroidsCount";
import AsteroidCard from "./AsteroidCard";

async function HomePage() {
    let data;
  try {
    const response = await fetch("http://127.0.0.1:8000/monitoring");
    data = await response.json();
  } catch (err) {
    data = { message: `There was an error: ${err}` };
  }

  if (data.error) {
  return (
    <div>
      <Title />
      <p>{data.error}</p>
    </div>
  );
}

  return (
    <div>
      <Title />
      <AsteroidCount text="Asteroids monitored" count={data.count} />
      <AsteroidCount
        text="Potentially dangerous"
        count={data.potentially_hazardous_asteroids_count}
      />
      <ul>
        {data.asteroids_list.map((item) => {
          return (
              <AsteroidCard
                key={item.id}
                asteroid={item}
              />
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage