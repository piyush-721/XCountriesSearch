import { useEffect, useState } from 'react';
import './App.css';

function CountryCards({name, image}){
  return(
    <div className='countryCard'>
      <img className='image' src={image} alt={name} />
      <p className='names'>{name}</p>
    </div>
  );
}

function App() {

  const [countries, setCountries] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  // if countries.common includes e.target.value set filteredList 

  const handleChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtered = countries.filter((names) => names.common.toLowerCase().includes(text));
    setFilteredList(filtered);
  }

  useEffect(() => {
    try{
      fetch(`https://countries-search-data-prod-812920491762.asia-south1.run.app/countries`)
      .then((response) => response.json())
      .then((data) => setCountries(data));
    }
    catch(e){
      console.error(e);
    }
  }, [])

  return (
    <div className="App">
      <input onChange={(e) => handleChange(e)} className="search-input" type="text" placeholder='Search for countries...' />
        <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
      {(searchText.length > 0 ? filteredList : countries).map((item, index) => (
        <CountryCards key={`country-${index}`} name={item.common} image={item.png} />
      ))}
      </div>
    </div>
  );
}

export default App;
