import React from 'react'
import DaySummaryForcast from './DaySummaryForcast';
import useMouseHoverEffect from '../../useMouseHoverEffect';

export default function WeekForcast({weeks, index, setActiveSection}) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const containerRef = useMouseHoverEffect()
  return (
    <div className='container week-forecast-container' style={{}} ref={containerRef}  >
        <label className='container-label'>7-DAY FORECAST</label>
        {weeks.slice(0, 7).map((week, i) => {
        const d = new Date(week.date);
        const dayName = days[d.getDay()];

        // Determine the display name for the day
        const day = i === 0 ? "Today" : dayName;

        return (
            <React.Fragment key={i}>
                <DaySummaryForcast day={day} desc={week.hourly[3].weatherDesc[0]['value'] } maxT={week.maxtempC} minT={week.mintempC}
                iconUrl={week.hourly[3].weatherIconUrl[0]['value']}/>
                {i < 6 ? <hr style={{width:'85%'}} /> : null}
            </React.Fragment>
        )
      })}
    </div>
  )
}
