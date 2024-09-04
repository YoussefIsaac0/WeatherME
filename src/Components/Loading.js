import React from 'react'

export default function Loading() {
  return (
    <>
    
    <div style={{display:'flex', justifyContent:"center", alignItems:"center", minHeight:'99vh', flexDirection:"column", gap:"20px"}}>
    <div id='loading'/>
    <h2 style={{color:'white'}}>Loading...</h2>
    <h3 style={{color:'white'}}>Fetching your Country Data. Make sure you gave us the permission to access your location</h3>
    </div>
    </>
  )
}
