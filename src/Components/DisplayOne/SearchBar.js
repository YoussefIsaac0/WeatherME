import React, { useContext, useEffect, useState } from 'react'
import DisplayContext from '../../DisplayContext'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function SearchBar({index, setActiveSection}) {
  const { display1, setDisplay1, cities, setCity } = useContext(DisplayContext)
  const [filteredCities, setFilteredCities] = useState(cities)
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    if(cities){
      if (searchQuery === '') {
        setFilteredCities(cities); // If search query is empty, show all cities
      } else {
        const filtered = cities.filter((city) =>
          city.includes(searchQuery.toLowerCase())
        );
        setFilteredCities(filtered); // Set the filtered list of cities
      }
    }
  }, [searchQuery, cities]);
  
  const IsInputValid = () => {
    return cities.includes(searchQuery.toLowerCase());
  }

  const HandleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if(IsInputValid()){
      setCity(searchQuery)
      setDisplay1(false);
    }
    else toast.error('Please select a valid city.');

  }

  const handleUserChoice = (e,city) => {
    e.preventDefault()
    setSearchQuery(city);
    setFilteredCities([city]);
  }

  return (
    <form role="search" id='search-bar' draggable onDragStart={() => setActiveSection(index)} onDragEnd={() => setActiveSection(null)}>
      <div className='form'>
        <input
          id="search"
          type="search"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={HandleSubmit}>Search</button>    
      </div>
      {filteredCities?
        <div className='search-options'>
          
          {filteredCities.length>0?filteredCities.map((city, key) => (
            <button
              className='search-option'
              key={key}
              onClick={(e) => handleUserChoice(e,city)}
              
            >
              {city}
            </button>
          )):<div style={{fontFamily:'arial', padding:'10px'}}>No cities matches your input.</div>}
        </div>:null
      }
    <ToastContainer />
    </form>

  )
}
