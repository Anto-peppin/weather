import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { TbWorldLongitude } from "react-icons/tb";
import Wind from "./Wind";
import Sun from "./Sun";
import { TbWorldLatitude } from "react-icons/tb";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWater } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import Datas from "./Datas";
import { TrophySpin } from "react-loading-indicators";

const App = () => {
  const [input, setInput] = useState("");
  const [place, setPlace] = useState("madurai");
  const [fullData, setFullData] = useState();
  const [error, setError] = useState("");

  const handleSearch = () => {
    setPlace(input);
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    const apiCall = async () => {
      try {
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=12ffff0dbaaafabc472f02fb03d24551`
        );
        setFullData(data.data);
        setError("");
      } catch (error) {
        setError("Enter the Vaild Place");
      }
    };
    apiCall();
    setError("");
  }, [place]);

  const bg = (val) => {
    switch (val) {
      case "01":
        return "./clearSky.gif";
      case "02":
        return "./clouds.gif";
      case "03":
        return "./clouds.gif";
      case "04":
        return "./clouds.gif";
      case "09":
        return "./rain.gif";
      case "10":
        return "./rain.gif";
      case "11":
        return "./thunder.gif";
      case "13":
        return "./snow.webp";
      case "50":
        return "./fog.gif";
    }
  };
  if (fullData) {
    return (
      <div className="relative w-full sm:h-screen ">
        {/* bg */}
        <div className="fixed inset-0 z-0 top-0 left-0">
          <img
            className="w-full h-full object-fill z-0"
            src={bg((fullData?.weather[0]?.icon + "").slice(0, 2))}
          />
        </div>
        {/* main */}

        <div className="relative sm:flex sm:justify-between sm:overflow-hidden  w-full h-full z-10 black text-white">
          {/* search */}

          <div className="sm:hidden  p-4 pt-7 backdrop-blur-[5px] sticky top-0 z-20">
            <div className="mb-3 text-2xl font-logo ">Anto Weather</div>
            <div className="  border-2  rounded-xl flex  ">
              <input
                value={input}
                onChange={handleInput}
                placeholder="Search the Place"
                className="border-0 outline-0  p-1 grow  pl-2  "
                type="text"
              />
              <button
                onClick={handleSearch}
                className="px-2  bg-white text-black cursor-pointer "
                style={{ borderRadius: "0 8px 8px 0" }}
              >
                Search
              </button>
            </div>
            <p className="text-red-500 text-[10px] mt-2">{error}</p>
          </div>

          {/* middle */}
          <div className="p-2 py-4 flex flex-col justify-between grow">
            <div className=" hidden sm:block mb-3 text-2xl font-logo ">
              Anto Weather
            </div>
            <div
              className="text-black flex w-[90%] sm:w-full p-2 relative left-[50%] sm:mt-0   bg-white/70 gap-2 items-center mt-[250px] backdrop-blur-3xl justify-center rounded-2xl md:self-end "
              style={{ transform: "translate(-50%)" }}
            >
              <span className="text-5xl font-bold md:text-7xl ">
                <h2>{Math.floor(fullData?.main?.temp - 273.5)}&deg;</h2>
              </span>
              <div className="text-center">
                <p className="text-2xl md:font-bold md:text-3xl ">{fullData?.name}</p>
                <p className="text-l">{new Date().toDateString()}</p>
              </div>
              <div className="flex flex-col items-center ">
                <img
                  className="w-15  "
                  src={`https://openweathermap.org/img/wn/${fullData?.weather[0]?.icon}@2x.png`}
                  alt=""
                />
                <p className="md:font-bold text-2xl">{fullData?.weather[0]?.main}</p>
              </div>
            </div>
          </div>

          {/* footer */}

          <div className=" w-[90%] p-2  mx-auto mt-6  rounded-xl sm:min-w-[300px] sm:max-w-[350px]  sm:h-screen overflow-auto">
            <div className="  border-2  rounded-xl  hidden sm:flex  mb-3">
              <input
                placeholder="Search the Place"
                onChange={handleInput}
                value={input}
                className="border-0 outline-0  p-1 grow  pl-2  "
                type="text"
              />
              <button
                onClick={handleSearch}
                className="px-2  bg-white text-black cursor-pointer "
                style={{ borderRadius: "0 8px 8px 0" }}
              >
                Search
              </button>
            </div>

            <div className="text-black w-full flex gap-3 sm:mt-10  flex-wrap justify-evenly">
              <Datas
                icon={<TbWorldLongitude />}
                label={"Longitude"}
                data={(fullData?.coord?.lon * 1).toFixed(2)}
                val={1}
              />

              <Datas
                icon={<TbWorldLatitude />}
                label={"Latitude"}
                data={(fullData?.coord?.lat * 1).toFixed(2)}
                val={1}
              />

              <Datas
                icon={<FaArrowUpFromGroundWater />}
                label={"Ground Level"}
                data={fullData?.main?.grnd_level}
                val={3}
              />

              <Datas
                icon={<FaCompressArrowsAlt />}
                label={"Pressure"}
                data={fullData?.main?.pressure}
                val={3}
              />

              <Datas
                icon={<WiHumidity />}
                label={"Humidity"}
                data={fullData?.main?.humidity}
                val={2}
              />

              <Datas
                icon={<FaWater />}
                label={"Sea Level"}
                data={fullData?.main?.sea_level}
                val={3}
              />
            </div>

            <Sun
              rise={fullData?.sys?.sunrise}
              set={fullData?.sys?.sunset}
              time={fullData?.timezone}
              data={fullData}
            />

            <div className="mt-5 text-black w-full bg-white/70 p-3 rounded backdrop-blur-2xl flex flex-col gap-2 sm:mb-10">
              <label className="flex gap-1 items-center">
                <FaWind /> Wind
              </label>
              <Wind
                speed={fullData?.wind?.speed}
                deg={fullData?.wind?.deg}
                gust={fullData?.wind?.gust}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center w-full h-screen ">
        <TrophySpin
          color={["#18e6c4", "#5d18e6", "#e6183a", "#a1e618"]}
          size="large"
          text="LOADING..."
          textColor="blue"
        />
      </div>
    );
  }
};

export default App;
