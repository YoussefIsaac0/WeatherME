import React, { useContext } from 'react'
import DisplayContext from '../../DisplayContext'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate();
    const HandleBack = () =>{
        navigate('/first-display')

    }
  return (
    <div className='container' id="back-button" onClick={HandleBack}>
        <img src='/Images/back.svg' alt="back"/>
    </div>
  )
}
