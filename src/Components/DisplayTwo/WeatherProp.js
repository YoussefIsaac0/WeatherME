import React from 'react'
import useMouseHoverEffect from '../../useMouseHoverEffect'

export default function WeatherProp({name, val,img}) {
  const container = useMouseHoverEffect()
  return (
    <div className="container prop" ref={container}>
        <label className='sec' style={{alignSelf:'flex-start'}}>{name}</label>
        <div className='main condition-description'>
            <img src={img}/>
            <label>{val}</label>
        </div>
    </div>
  )
}
