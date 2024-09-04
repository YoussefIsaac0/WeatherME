import React from 'react'

export default function Loading() {
  return (
    <div className='col-flex '>
    
    <div style={{display:'flex', justifyContent:"center", alignItems:"center", minHeight:'99vh', flexDirection:"column", gap:"20px"}}>
    <div id='loading'/>
    <h2 className='message'>Loading...</h2>
    <h3 className='message'>Fetching your Country Data. Make sure you gave us the permission to access your location</h3>
    </div>
    </div>
  )
}
