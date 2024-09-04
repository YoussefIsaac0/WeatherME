import React from 'react'
import DayForcast from './DayForcast'
import useMouseHoverEffect from '../../useMouseHoverEffect'

export default function TodaysForcast({days, index, setActiveSection}) {
    const container = useMouseHoverEffect();
    const clocks=["12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"]
  return (
    <div className='container drag' style={{width:'100%'}}  ref={container} draggable onDragStart={()=>setActiveSection(index)} onDragEnd={()=>setActiveSection(null)}>
        <label className='container-label'>TODAY'S FORECAST</label>
        <div className="day-forcast-container">
        {
            days.map((day,i)=>{
                return(
                <React.Fragment key={i}>
                <DayForcast clock={clocks[i]} icon={day.weatherIconUrl[0]['value']} temp={day.tempC}/>
                {i < 7 ? <hr style={{minHeight:'120px', backgroundColor:"var(--fontSecondaryDark)"}}/> : null}
                </React.Fragment>)
                                
            })
        }
        </div>
    </div>
  )
}
