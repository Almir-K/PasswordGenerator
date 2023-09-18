import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoonIconDark from "../assets/moon-bordered.svg";
import MoonIconLight from "../assets/moon.svg";
import LogoDark from "../assets/techover-logo-dark.png";
import LogoLight from "../assets/techover-logo.png";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    document.body.classList.toggle("light-theme");
    document.querySelector(".header").classList.toggle("light-theme");
    document.querySelector("h1").classList.toggle("light-theme");

    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <div>
          <Link to="/" className="header-title">
            <h1>The Flag App</h1>
          </Link>
        </div>
        <div>
          <img src={isDarkMode ? LogoDark : LogoLight} alt="TechOver Logo" />
        </div>
        <div>
          <button className="btn-moon" onClick={handleThemeToggle}>
            {isDarkMode ? (
              <img src={MoonIconDark} alt="Moon Icon Dark" />
            ) : (
              <img src={MoonIconLight} alt="Moon Icon Light" />
            )}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
