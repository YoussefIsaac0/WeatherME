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


const WorldWeatherApiKey = process.env.REACT_APP_API_WEATHER
const CountryApiKey = process.env.REACT_APP_API_COUNTRY
function App() {
 //Defining Necessary States
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [display1,setDisplay1]=useState(true);
  const [loading, setLoading] = useState(true)
  const [country, setCountry]=useState('Egypt')
  const [city,setCity]= useState('Cairo')
  const [cities,setCities] = useState(null);
 

  useEffect(() => {
    console.log(process.env.REACT_APP_API_WEATHER)      
    // Getting GeoLocation (User location based on latitude & longitude)
    GetGeoLocation()
    .then((loc) => {
        if (loc) {
          fetchWeatherData(loc.latitude,loc.longitude,null);
          GetCountryName(loc.latitude,loc.longitude);
          
        } else { //Data isn't valid, fetch default country;
          fetchWeatherData(null,null,"Egypt")
          GetCountryName(true,true);

        }
      })
      .catch((e) => { //return weather data of default country
        fetchWeatherData(null,null,"Egypt")
        console.log(e.message)
        GetCountryName(true, true);

      });
      
    // API for getting weather data
    const fetchWeatherData = (latitude,longitude,city) =>{
      axios.get('https://api.worldweatheronline.com/premium/v1/weather.ashx', {
      params: {
          q: latitude?(latitude + "," + longitude): city,
          key: process.env.REACT_APP_API_WEATHER,
          format: 'json',
          lang: 'english',
          showmap: 'yes',
        },
      })
      .then((evt) => {
        setWeatherData(evt.data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false)
        console.log('Error fetching weather data', err);
      });
    }

    const GetCountryName= (lat,long) => {
      if(lat===true && long ===true) return GetCities(country)
      axios.get('https://api.opencagedata.com/geocode/v1/json?',{
        params:{
          key: process.env.REACT_APP_API_COUNTRY,
          q:lat+'%2C'+long,
        }
      }).then((evt)=>{
        setCountry(evt.data.results[0].components.country);
          GetCities(country)
      }).catch(err=>{
        console.error(err.message);
        GetCities(country)

      })
    }
    // Fetch list of cities (The API is not reliable to further processing required to prevent errors.)
    const GetCities = (ctry)=>{
      axios
        .post('https://countriesnow.space/api/v0.1/countries/cities', {
          country:  ctry?ctry:country,
        })
        .then((res) => {setCities(res.data.data.filter(city => /^[A-Za-z\s]+$/.test(city)).map(city => city.toLowerCase())); setLoading(false)}) //remove invalid cities
        .catch((e) => {setError(e.message); setLoading(false)});
    }
  }, []);

  console.log(weatherData);
  
  

  return (
    <div className="App" style={{}}>
      {loading && <Loading/>}
      {error != null && <Error errorMsg={error}/>}
      {!loading && !error && weatherData && display1? (
        <div className='main-container-one' style={{}}>
        <DisplayContext.Provider value={{display1,setDisplay1, cities, setCity}}>
          <DisplayOneMainSection weatherData={weatherData} country={country}/>
        </DisplayContext.Provider>
        <div className='sub-container-two'>
          <WeekForcast  index={4} weeks={weatherData['data'].weather}/>
        </div>
        </div>
      ):null}
      {!display1 && !loading && !error? <DisplayContext.Provider value={{display1,setDisplay1}}>
       <SecondDisplay city={city} />
       </DisplayContext.Provider>: null}
    
    </div>
  );
}

export default App;
