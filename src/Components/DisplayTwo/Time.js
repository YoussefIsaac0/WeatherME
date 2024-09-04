import React from 'react'
import { GetCurrentData } from '../../Helper'
import useMouseHoverEffect from '../../useMouseHoverEffect'

export default function Time({weatherData,index,setActiveSection}) {
    const container3 = useMouseHoverEffect()
  return (
    <div className="container main main-widget drag" style={{width:'100%'}} ref={container3}
    draggable onDragStart={() => setActiveSection(index)} onDragEnd={() => setActiveSection(null)}>

        <p style={{margin:'auto'}}>Time: {GetCurrentData(weatherData,'observation_time')} (UTC)</p>
        </div>
  )
}
