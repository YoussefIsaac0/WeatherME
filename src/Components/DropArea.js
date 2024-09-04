import React, { useState } from 'react'

export default function DropArea({onDrop}) {
    const [showDrop,setShowDrop]=useState(false);
  return (
    <section
    onDrop={()=>{
        onDrop();
        setShowDrop(false);
    }}
    onDragOver={e=> e.preventDefault()}
    onDragEnter={()=>setShowDrop(true)} onDragLeave={()=>setShowDrop(false)} className= {showDrop ? 'drop-area': 'hide-drop'} >Drop Here</section>
  )
}
