import React, { useEffect, useState } from "react";

function Covid19App() {
  const [country, setCountry] = useState(null);
  const [search, setSearch] = useState("Greece");
  const date = new Date(Date.now()).toLocaleDateString("el-gr");

  function Search() {
    const search = document.getElementById("search").value;
    setSearch(search);
    setCountry(null);
  }

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://disease.sh/v3/covid-19/countries/${search}`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCountry(resJson);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="mainn">
        
        <div className="inputdata">
          <input
            className="input"
            placeholder="Enter Country Name..."
            type="search"
            id="search"
          />
          
          <button onClick={() => Search()} className="btn-search">
            Search
          </button>
          
          <h4 className="semi-opaque">{date}</h4>
        </div>
        {country === "" ? (
          <p className="temp">No Data Found</p>
        ) : !country ? (
          <p className="temp">No Data Found</p>
        ) : (
          <div className="hy">
            
            <div className="main-div">
              <h1 className="temp flex-child">{search}</h1>
              <img
                src={country.countryInfo.flag}
                alt={country.countryInfo.iso3}
                className="image-child flex-child"
              />
            </div>
            <h3 className="temp">
              Population :{" "}
              {country.population.toLocaleString("de-DE")} citizens
            </h3>
            
            <h3 className="temp">
              Total Cases : {country.cases.toLocaleString("de-DE")}
            </h3>
            
            <h3 className="temp">
              Deaths : {country.deaths.toLocaleString("de-DE")}
            </h3>
            
            <h3 className="temp">
              Recovered : {country.recovered.toLocaleString("de-DE")}
            </h3>
            
            <h3 className="temp">
              Critical Condition : {country.critical.toLocaleString("de-DE")}
            </h3>
            
            <h3 className="temp">
              Cases Reported Today :{" "}
              {country.todayCases.toLocaleString("de-DE")} cases
            </h3>            
            <h3 className="temp">Recovery percentage : {((country.recovered / country.cases) * 100).toFixed(2)} %</h3>
          </div>
        )}
      </div>
    </>
  );
}
export default Covid19App;
