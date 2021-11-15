import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  const [recent, updateRecent] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "Enter Your API Key";
  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    if (name == "country") {
      setForm({ ...form, country: value });
    }
  };
  const onSave = (e) => {
    recent.city = form.city;
    recent.country = form.country;
    localStorage.setItem("rec1", JSON.stringify(recent.city));
    console.log(recent.city);
    console.log(recent.country);
  };

  // const getRecent = (e) => {
  //   setForm({ ...form, city: JSON.parse(localStorage.getItem("rec1")) });
  //   weatherData(e);
  // };

  return (
    <>
      {/* <button onClick={(e) => getRecent(e)}>
        {JSON.parse(localStorage.getItem("rec1"))}
      </button>
      <button onClick={(e) => onSave(e)}>save</button> */}
      <div className="weather">
        <span className="title">Weather App</span>
        <br />
        <form>
          <input
            type="text"
            className="cityIn"
            placeholder="city"
            name="city"
            onChange={(e) => handleChange(e)}
          />
          &nbsp; &nbsp; &nbsp;&nbsp;
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={(e) => handleChange(e)}
          />
          <button className="getweather" onClick={(e) => weatherData(e)}>
            Submit
          </button>
        </form>

        {/* {console.log(weather)} */}
        {weather.data != undefined ? (
          <div>
            <DisplayWeather data={weather.data} />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Weather;
