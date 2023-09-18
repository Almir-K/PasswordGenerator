import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "https://restcountries.com/v3.1/all";

const Countries = ({ searchTerm, selectedRegion }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const countriesData = await response.json();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountryData();
  }, []);

  //  filtering when search
  const filteredCountries = countries.filter((country) => {
    if (searchTerm && !country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedRegion && country.region !== selectedRegion) {
      return false;
    }
    return true;
  });

  return (
    <section className="grid">
      {filteredCountries.map((country) => {
        const {
          numericCode,
          name: { common },
          population,
          region,
          capital,
          flags,
        } = country;
        const countryFlag = flags?.svg || "";

        return (
          <article key={numericCode} className="card">
            <Link to={`/countries/${common}`} className="card-link">
              <div>
                {countryFlag && <img src={countryFlag} alt={common} />}
                <div className="details">
                  <h3>{common}</h3>
                  <h4>
                    Population: <span>{population}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital}</span>
                  </h4>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </section>
  );
};

export default Countries;
