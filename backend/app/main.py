from fastapi import FastAPI
import datetime as dt
import httpx
from dotenv import load_dotenv
import os

load_dotenv()

nasa_api_key = os.environ.get("NASA_API_KEY")
nasa_endpoint = "https://api.nasa.gov/neo/rest/v1/feed"


app = FastAPI()

@app.get("/test")
def test():
    return {"message": "test completed succesfully"}

@app.get("/monitoring")
def monitoring():
    today = dt.datetime.now()

    start_date = today.strftime("%Y-%m-%d")
    end_date = (today + dt.timedelta(days=7)).strftime("%Y-%m-%d")
    print(start_date)
    print(end_date)

    params = {
        "start_date": start_date,
        "end_date": end_date,
        "api_key": nasa_api_key,
    }

    response = httpx.get(url=nasa_endpoint, params=params)
    response.raise_for_status()
    datas = response.json()

    asteroids_list = []

    for data in datas["near_earth_objects"].values():
        asteroids_list.extend(data)


    potentially_hazardous_asteroids_count = 0

    for asteroid in asteroids_list:
        if asteroid["is_potentially_hazardous_asteroid"]:
            potentially_hazardous_asteroids_count += 1

    asteroids_json = {
        "count": datas["element_count"],
        "potentially_hazardous_asteroids_count": potentially_hazardous_asteroids_count,
        "asteroid_list": asteroids_list,
    }

    return asteroids_json
