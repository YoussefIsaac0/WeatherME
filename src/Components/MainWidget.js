import React from 'react'
import useMouseHoverEffect from '../useMouseHoverEffect'

export default function MainWidget({temp,country,icon, index, setActiveSection, desc}) {
    const container = useMouseHoverEffect()
  return (
    <div
     className="container main-widget drag"
     style={{width:"100%"}} 
     ref={container} 
     draggable
     onDragStart={()=>setActiveSection(index)} 
     onDragEnd={()=>setActiveSection(null)}>

        <div id='main-widget-temp'>
            {temp?<label>{temp}°C</label>:null}
            <div className="row-flex" style={{justifyContent:'flex-start', padding:'0', flexWrap:'wrap'}}>
            {country?<label className='sec' >{country}</label>:null}
            {desc?<label className='sec' style={{color:'white'}}>{desc}</label>:null}
            </div>
        </div>
        <img src={icon} alt="weather" />
    </div>

  )
}
