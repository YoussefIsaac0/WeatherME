import React from 'react'

export default function Error({errorMsg}) {
  return (
    <>
        <div style={{display:'flex', justifyContent:"center", alignItems:"center", minHeight:'99vh', flexDirection:"column", gap:"20px"}}>
        <h2 style={{color:'white'}}>The Service isn't available right Now</h2>
        <h3 style={{color:'white', textAlign:'center'}}>{errorMsg}</h3>
        </div>
    </>
  )
}
