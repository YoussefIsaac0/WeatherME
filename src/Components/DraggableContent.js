import React from 'react'
import DropArea from './DropArea';

export default function DraggableContent({sections, setSections, activeSection,setActiveSection}) {
    
    const onDrop=(status, position)=>{
        try{
        const sectionToMove = sections[activeSection];
        const updateSections = sections.filter((section,index)=>index!==activeSection);
        updateSections.splice(position,0,{
        ...sectionToMove,
        })
        setSections(updateSections)
        setActiveSection(null)
        }catch(e){
            return;
        }
    }
  return (
    <>
    <DropArea key={0} onDrop={()=>onDrop(0,0)}/>
        {
            sections.map(({component, key}, index) => (
                <React.Fragment key={index}>
                    {component? React.cloneElement(component, { setActiveSection, index }):null}
                    <DropArea key={`drop-start-${index}`} onDrop={()=>onDrop(0,index < activeSection ? index + 1 : index)}/>
                </React.Fragment>
            ))
        }
    </>
  )
}
