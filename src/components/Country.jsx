import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowLeft from "../assets/arrow-left.svg";
import ArrowLeftDark from "../assets/arrow-left-dark.svg"; // Add this line
import "../country.css";

const Country = () => {
  const [country, setCountry] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { countryName } = useParams();

  useEffect(() => {
    // Check local storage for theme mode on mount
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode === "true") {
      document.body.classList.add("light-theme");
      setIsDarkMode(true);
    }

    // Fetch country data
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        const countryData = await response.json();
        setCountry(countryData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountryData();
  }, [countryName]);

  if (!country.name) {
    return <div>Loading...</div>;
  }

  const {
    flags,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    currencies,
    languages,
    borders,
    tld,
  } = country;

  const nativeNameCommon = nativeName?.common;

  return (
    <>
      <section className="country">
        <Link to="/" className="btn btn-light">
          <img src={isDarkMode ? ArrowLeftDark : ArrowLeft} alt="Back" />
        </Link>
        <span className="back-btn">Back</span>

        <article key={name}>
          <div className="country-inner">
            <div className="flag">
              <img src={flags?.svg} alt={name.common} />
            </div>

            <div className="country-details">
              <div>
                <h2>{name.common}</h2>
                {nativeNameCommon && (
                  <h5>
                    Native Name: <span>{nativeNameCommon}</span>
                  </h5>
                )}
                <h5>
                  Population: <span>{population?.toLocaleString()}</span>
                </h5>
                <h5>
                  Region: <span>{region}</span>
                </h5>
                <h5>
                  Sub Region: <span>{subregion}</span>
                </h5>
                <h5>
                  Capital: <span>{capital?.[0]}</span>
                </h5>
              </div>

              <div>
                <h5>
                  Top Level Domain: <span>{tld?.[0]}</span>
                </h5>
                <h5>
                  Currencies:{" "}
                  <span>{currencies?.[Object.keys(currencies)[0]]?.name}</span>
                </h5>
                <h5>
                  Languages:{" "}
                  <span>{languages?.[Object.keys(languages)[0]]}</span>
                </h5>
              </div>
              <div>
                <h3>Border Countries: </h3>
                <div className="borders">
                  {borders?.map(border => {
                    return (
                      <ul key={border}>
                        <li>
                          <Link to={`/countries/${border}`}>{border}</Link>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Country;
