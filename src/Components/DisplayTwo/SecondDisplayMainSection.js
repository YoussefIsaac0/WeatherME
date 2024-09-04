import React, { Component, useState } from 'react'
import { GetCurrentData, GetDailyTemperature, GetHourlyTemperature } from '../../Helper'
import WeatherPropContainer from './WeatherPropContainer'
import D3LineChart from './D3LineChart'
import DraggableContent from '../DraggableContent'
import DayTempBarChart from './DayTempBarChart'
export default function SecondDisplayMainSection({weatherData}) {
    const [activeSection,setActiveSection] = useState(null);
    const [sections,setSections]=useState([
      {component:<WeatherPropContainer arr={weatherData} setActiveSection={setActiveSection}/> ,key:0},
      {component:<D3LineChart data={GetHourlyTemperature(weatherData)}/>,key:1},
      {component: <DayTempBarChart data={GetDailyTemperature(weatherData)}/>,key:2}
    ])
  return (
    <div className='second-display-main-container'>
        
        <DraggableContent sections={sections} setSections={setSections} activeSection={activeSection} setActiveSection={setActiveSection}/>
          
    </div>
  )
}
