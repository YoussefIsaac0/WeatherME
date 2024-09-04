import React from 'react'
import WeatherProp from './WeatherProp';
import { GetCurrentData } from '../../Helper';

export default function WeatherPropContainer({arr, index, setActiveSection}) {
    const weatherPropData = [
        { icon: "./Images/feels.svg", label: "Feels Like", value: `${GetCurrentData(arr, 'FeelsLikeC')}°C` },
        { icon: "./Images/sun.svg", label: "UV", value: GetCurrentData(arr, 'uvIndex') },
        { icon: "./Images/visibility.png", label: "Visibility", value: GetCurrentData(arr, 'visibility') },
        { icon: "./Images/wind.png", label: "Wind", value: `${GetCurrentData(arr, 'windspeedKmph')} km/h` },
        { icon: "./Images/pressure.svg", label: "Pressure", value: `${GetCurrentData(arr, 'pressure')} hPa` },
    ];
  return (
    <div className="row-flex prop-container drag" draggable onDragStart={() => setActiveSection(index)} onDragEnd={() => setActiveSection(null)}>
    {
        weatherPropData.map((prop,key)=>{
            return <WeatherProp name={prop.label} val={prop.value} img={prop.icon} key = {key}/>
        })
    }   
    </div>
  )
}
