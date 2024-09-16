import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GetGeoLocation } from './Helper.js';
import './App.css'
import WeekForcast from './Components/DisplayOne/WeekForcast.js';
import DisplayOneMainSection from './Components/DisplayOne/DisplayOneMainSection.js';
import SecondDisplay from './Components/DisplayTwo/SecondDisplay.js';
import DisplayContext from './DisplayContext.js';
import Loading from './Components/Loading.js';
import Error from './Components/Error.js';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DisplayOne from './Components/DisplayOne/DisplayOne.js';


const WorldWeatherApiKey = process.env.REACT_APP_API_WEATHER
const CountryApiKey = process.env.REACT_APP_API_COUNTRY
function App() {
 //Defining Necessary States
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [country, setCountry]=useState('Egypt')
  const [city,setCity]= useState('Cairo')
  const [cities,setCities] = useState(null);
 

  useEffect(() => {
    console.log(process.env.REACT_APP_API_WEATHER);    
    // Getting GeoLocation (User location based on latitude & longitude)
    (async () => {
      try {
        const loc = await GetGeoLocation();
    
        if (loc) {
          // If location is available, fetch weather data and country name based on location
          await fetchWeatherData(loc.latitude, loc.longitude, null);
          await GetCountryName(loc.latitude, loc.longitude);
        } else {
          // If location is not available, fetch default country data
          await fetchWeatherData(null, null, "Egypt");
          await GetCountryName(true, true);
        }
      } catch (error) {
        // Handle error by fetching default country data
        await fetchWeatherData(null, null, "Egypt");
        console.error('Error fetching location:', error.message);
        await GetCountryName(true, true);
      }
    })();
          
    // API for getting weather data
    const fetchWeatherData = async (latitude,longitude,city) =>{
      try{
      const response = await axios.get('https://api.worldweatheronline.com/premium/v1/weather.ashx', {
      params: {
          q: latitude?(latitude + "," + longitude): city,
          key: process.env.REACT_APP_API_WEATHER,
          format: 'json',
          lang: 'english',
          showmap: 'yes',
        },
      })
        setWeatherData(response.data);
    }catch (err){
        setError(err.message);
        setLoading(false)
        console.log('Error fetching weather data', err);
      };
    }

    const GetCountryName= async (lat,long) => {
      try{
      if(lat===true && long ===true) return GetCities(country)
      const response =await axios.get('https://api.opencagedata.com/geocode/v1/json?',{
        params:{
          key: process.env.REACT_APP_API_COUNTRY,
          q:lat+'%2C'+long,
        }
      })
        setCountry(response.data.results[0].components.country);
          GetCities(country)
      
      }catch(err){
        console.error(err.message);
        GetCities(country)

      }
    }
    // Fetch list of cities (The API is not reliable to further processing required to prevent errors.)
    const GetCities = async (ctry)=>{
      try{
      const res = await axios
        .post('https://countriesnow.space/api/v0.1/countries/cities', {
          country:  ctry?ctry:country,
        })
        setCities(res.data.data.filter(city => /^[A-Za-z\s]+$/.test(city)).map(city => city.toLowerCase())); setLoading(false) //remove invalid cities
      }catch(e) {setError(e.message); setLoading(false)};
    }
  }, []);

  console.log(weatherData);
  
  if (loading) return <Loading />;
  if (error) return <Error errorMsg={error} />;

  return (
      
      <DisplayContext.Provider value={{ cities, setCity }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/first-display" />} />
          <Route path="/first-display" element={<div className='App'><DisplayOne weatherData={weatherData} country={country} /> </div>} />
          <Route path="/second-display" element={<SecondDisplay city={city} />} />
        </Routes>
      </BrowserRouter>
    </DisplayContext.Provider>
    
  );
}

export default App;
