import React, { useContext } from 'react'
import DisplayContext from '../../DisplayContext'

export default function BackButton() {
    const {display1,setDisplay1} =useContext(DisplayContext)
    const HandleBack = () =>{
        setDisplay1(true)
    }
  return (
    <div className='container' id="back-button" onClick={HandleBack}>
        <img src='./Images/back.svg' alt="back"/>
    </div>
  )
}
