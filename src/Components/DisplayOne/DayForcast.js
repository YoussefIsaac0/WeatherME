import React from 'react'

export default function DayForcast(props) {
  return (
    <div className='day-forcast'>
        <label className='sec clock-in-day-forecast'>{props.clock}</label>
        <img src={props.icon} alt="weatherIcon" />
        <label>{props.temp}°</label>
    </div>
  )
}
