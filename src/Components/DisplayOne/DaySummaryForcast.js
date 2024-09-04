import React from 'react'

export default function DaySummaryForcast(props) {
  return (
    <div className='day-summary-container' >
        <label className='sec'>{props.day}</label>
        <label className='first description-image'>
             <img src={props.iconUrl} alt="desc" />
             {props.desc} 
        </label>
        <label> <span className='first'>{props.maxT}°</span> /<span className='sec'>{props.minT}°</span></label>
    </div>
  )
}
