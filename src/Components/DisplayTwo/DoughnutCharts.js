import React from 'react'
import { GetCurrentData } from '../../Helper'
import useMouseHoverEffect from '../../useMouseHoverEffect'
import UVIndexChart from './DoughnutChartUV'
import HumidityChart from './DoughnutHumidity'

export default function DoughnutCharts({weatherData,setActiveSection,index}) {
    const container1 = useMouseHoverEffect()
    const container2 = useMouseHoverEffect()
  return (
    <div className="row-flex charts drag" draggable onDragStart={() => setActiveSection(index)} onDragEnd={() => setActiveSection(null)}>
        <div className="container graph" style={{}} ref={container1}><UVIndexChart uvIndex={GetCurrentData(weatherData,'uvIndex')}/></div>
        <div className="container graph" style={{}} ref={container2}><HumidityChart humidity={GetCurrentData(weatherData,'humidity')}/></div>
    </div>
  )
}
