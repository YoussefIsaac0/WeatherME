import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import SecondDisplayMainSection from './SecondDisplayMainSection';
import SecondDisplaySubSection from './SecondDisplaySubSection';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading';
import Error from '../Error';
import DisplayContext from '../../DisplayContext';
import { Navigate, useNavigate } from 'react-router-dom';
const WorldWeatherApiKey = process.env.REACT_APP_API_WEATHER

export default function SecondDisplay({city}) {
      const {setDisplay1}=useContext(DisplayContext);
      const [weatherData,setWeatherData]= useState(null);
      const [loading,setLoading]=useState(true);
      const [error,setError] = useState(null)
      const navigate = useNavigate();
      const handleError = () =>{
        setTimeout(() => {
          navigate('/first-display')
        }, 3000);
      }
      useEffect(() => {
        // Calling the API for getting weather data
        axios
        .get('https://api.worldweatheronline.com/premium/v1/weather.ashx', {
          params: {
              q: city, 
              key: WorldWeatherApiKey,
              format: 'json',
              lang: 'english',
              showmap: 'yes',
            },
          })
          .then((evt) => {
            setWeatherData(evt.data);
            //console.log("EVENT DATA =>")
            console.log(evt?.['data']?.data?.['error']?.[0])
            if(evt?.['data']?.data?.['error']?.length>0 ?? false){setLoading(false); setError("This city's data is not available at the moment, redirecting you to the main page...");return handleError()}
            setLoading(false);
          
          })
          .catch(err => {
            console.log('Error fetching weather data', err);
            setLoading(false)
            setError(err.message)
            return handleError()
          });
  
      }, []);
      
      return (
        <>
        {loading&&<Loading/>}
        {error!=null && <Error errorMsg={error}/>}
        {weatherData && !error && !loading?
        <div className='second-display'>
          <SecondDisplaySubSection weatherData={weatherData} city={city}/>
          <SecondDisplayMainSection weatherData={weatherData}/>

          
        </div>
        :null}
        </>
      );
}
