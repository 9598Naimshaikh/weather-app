import axios from "axios";
import { useState } from "react";
import { FaWind } from "react-icons/fa6";
import { BiSlider } from "react-icons/bi";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherDetails, setWeatherDetails] = useState();

  const getData = async (e) => {
    console.log(city);
    e.preventDefault();

    try {
      const api_id = import.meta.env.VITE_WEATHER_API_ID;
      if (!api_id) {
        console.log("api does not exists.");
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_id}&units=metric`;
      const res = await axios.get(url);
      const data = await res.data;
      console.log(data);
      
      setWeatherDetails(data);
      console.log(weatherDetails);

      setCity("");
    } catch (err) {
      console.log("API error: ", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-800 text-zinc-100 flex items-center justify-center">
      <div className="main w-sm min-h-130 shadow-2xl shadow-purple-600 text-center space-y-4 border border-white/60 rounded-2xl px-6 py-10 bg-linear-300 to-purple-400/50 from-blue-500/50 flex flex-col items-center justify-between">
        {/* <h1 className="text-2xl font-bold tracking-wide">Welcome to Weather Hub</h1> */}

        <form
          onSubmit={getData}
          action=""
          className="w-full flex items-center justify-center gap-4"
        >
          <input
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="border rounded-full px-6 py-2 w-full"
            type="text"
            name="city"
            id="city"
            placeholder="City.."
          />
          <button
            type="submit"
            className="bg-linear-300 to-cyan-200 from-purple-600 font-bold px-6 py-2 rounded-full border active:scale-90 transition-all ease"
          >
            Search
          </button>
        </form>

        {weatherDetails && (
          <>
            <div className="weather_det w-full flex items-center flex-col justify-center my-10">
              {/* <img
                src="./images/weather-app.png"
                alt="weather image"
                className="w-25 my-5"
              /> */}
              <img src={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`} alt="" className="w-35 my-5" />
              <h1 className="text-5xl font-bold">{Math.floor(weatherDetails.main.temp)}℃</h1>
              <h3 className="text-2xl font-medium my-2">{weatherDetails.name}</h3>
            </div>

            <div className="bottom_details w-full flex items-center justify-between">
              <div className="humidity flex items-start gap-2">
                <BiSlider className="relative top-2 text-2xl" />
                <div className="flex flex-col items-start">
                  <p>{weatherDetails.main.humidity} %</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind flex items-start gap-2">
                <FaWind className="relative top-2 text-xl" />
                <div className="flex flex-col items-start">
                  <p>{weatherDetails.wind.speed} km/h</p>
                  <p>wind speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
