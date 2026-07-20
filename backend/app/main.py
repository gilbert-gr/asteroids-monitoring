from fastapi import FastAPI
import datetime as dt
import httpx
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

nasa_api_key = os.environ.get("NASA_API_KEY")
nasa_endpoint = "https://api.nasa.gov/neo/rest/v1/feed"


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/monitoring")
def monitoring():
    today = dt.datetime.now()

    start_date = today.strftime("%Y-%m-%d")
    start_date_formatted = today.strftime("%d %b")
    end_date = (today + dt.timedelta(days=7)).strftime("%Y-%m-%d")
    end_date_formatted = (today + dt.timedelta(days=7)).strftime("%d %b")
    print(start_date)
    print(end_date)

    params = {
        "start_date": start_date,
        "end_date": end_date,
        "api_key": nasa_api_key,
    }
    try:
        response = httpx.get(url=nasa_endpoint, params=params)
        response.raise_for_status()
        datas = response.json()

    except httpx.HTTPError as exc:
        print(f"HTTP Exception for {exc.request.url} - {exc}")

        return {
            "error": "There was an error while contacting the NASA API."
            }
    
    asteroids_list = []

    for data in datas["near_earth_objects"].values():
        asteroids_list.extend(data)


    potentially_hazardous_asteroids_count = 0

    asteroids_formatted = []

    for asteroid in asteroids_list:
        new_asteroid = {
            "id": asteroid["id"],
            "name": asteroid["name"],
            "estimated_diameter_min_meters": round(float(asteroid["estimated_diameter"]["meters"]["estimated_diameter_min"]), 2),
            "estimated_diameter_max_meters": round(float(asteroid["estimated_diameter"]["meters"]["estimated_diameter_max"]), 2),
            "is_potentially_hazardous_asteroid": asteroid["is_potentially_hazardous_asteroid"],
            "close_approach_date": asteroid["close_approach_data"][0]["close_approach_date"],
            "velocity_kmh": round(float(asteroid["close_approach_data"][0]["relative_velocity"]["kilometers_per_hour"]), 2),
            "miss_distance_km": round(float(asteroid["close_approach_data"][0]["miss_distance"]["kilometers"]), 2)
        }
        asteroids_formatted.append(new_asteroid)

        if asteroid["is_potentially_hazardous_asteroid"]:
            potentially_hazardous_asteroids_count += 1
    
    print(len(asteroids_formatted))

    asteroids_json = {
        "period": f"{start_date_formatted} / {end_date_formatted}",
        "count": datas["element_count"],
        "potentially_hazardous_asteroids_count": potentially_hazardous_asteroids_count,
        "asteroids_list": asteroids_formatted,
    }

    return asteroids_json
