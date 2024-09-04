import React from 'react'
import DisplayOneMainSection from './DisplayOneMainSection'
import WeekForcast from './WeekForcast'

export default function DisplayOne({display1,setDisplay1, cities, setCity,weatherData,country}) {
  return (
    <div className='main-container-one App' style={{}}>
          <DisplayOneMainSection weatherData={weatherData} country={country}/>
        <div className='sub-container-two'>
          <WeekForcast  index={4} weeks={weatherData['data'].weather}/>
        </div>
    </div>
  )
}
