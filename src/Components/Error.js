import React from 'react'

export default function Error({errorMsg}) {
  return (
    <>
        <div style={{display:'flex', justifyContent:"center", alignItems:"center", minHeight:'99vh', flexDirection:"column", gap:"20px"}}>
        <h2 className='message'>The Service isn't available right Now</h2>
        <h3 className='message'>{errorMsg}</h3>
        </div>
    </>
  )
}
