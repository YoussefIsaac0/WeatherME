import React, { useState } from 'react'
import AirConditions from './AirConditions.js';
import '../../App.css'
import TodaysForcast from './TodaysForcast.js';
import SearchBar from './SearchBar.js';
import MainWidget from '../MainWidget.js';
import DraggableContent from '../DraggableContent.js';

export default function DisplayOneMainSection({weatherData,country}) {
    const [activeSection, setActiveSection] = useState(null)
    const [sections, setSections] = useState([
        { component: <SearchBar setActiveSection={setActiveSection} />, key: 0 },
        { component: <MainWidget desc={weatherData['data'].current_condition[0].weatherDesc[0]['value']} setActiveSection={setActiveSection} temp={weatherData['data'].current_condition[0].temp_C} icon={weatherData['data'].current_condition[0].weatherIconUrl[0]['value']} country={country} />, key: 1 },
        { component: <TodaysForcast setActiveSection={setActiveSection} days={weatherData['data'].weather[0].hourly} />, key: 2 },
        { component: <AirConditions setActiveSection={setActiveSection} arr={weatherData} />, key: 3 }
    ]);
    
    return (
        <div className='sub-container-one '>
            <DraggableContent sections={sections} setSections={setSections} activeSection={activeSection} setActiveSection={setActiveSection}/>
        </div>
    );
}
