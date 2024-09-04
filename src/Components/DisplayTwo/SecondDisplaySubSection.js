import React, { useState } from 'react'
import MainWidget from '../MainWidget'
import BackButton from './BackButton'
import Time from './Time'
import DoughnutCharts from './DoughnutCharts'
import DraggableContent from '../DraggableContent'

export default function SecondDisplaySubSection({weatherData,city}) {
    
    const [activeSection,setActiveSection] = useState(null);
    const [sections,setSections]=useState([
      {component:<Time weatherData={weatherData} setActiveSection={setActiveSection}/> ,key:0},
      {
        component: <MainWidget
            setActiveSection={setActiveSection}
            temp={weatherData?.data?.current_condition?.[0]?.temp_C ?? undefined}
            icon={weatherData?.data?.current_condition?.[0]?.weatherIconUrl?.[0]?.value ?? undefined}
            country={weatherData?.data?.request?.[0]?.query ?? undefined}
            desc={weatherData?.data?.current_condition?.[0]?.weatherDesc?.[0]?.value ?? undefined}
        />, 
        key: 1
    },
      {component: <DoughnutCharts weatherData={weatherData}/>,key:2}
    ])
  return (
    <div className="second-display-sub-container">
      <BackButton/>
      <DraggableContent sections={sections} setSections={setSections} activeSection={activeSection} setActiveSection={setActiveSection}/>
    </div>
  )
}
