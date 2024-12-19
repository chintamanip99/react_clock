import React, { useState, useEffect } from "react";
import styled from "styled-components";
import countries from "countries-and-timezones";
import Select from "react-select"; 
import AnalogClock from "./AnalogClock";

const App = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const allCountries = countries.getAllCountries();
    const countryList = Object.values(allCountries).map((country) => ({
      value: country.id,
      label: country.name,
    }));
    setCountryOptions(countryList.sort((a, b) => a.label.localeCompare(b.label)));
  }, []);


  useEffect(() => {
    if (selectedCountry) {
      const countryTimezones =
        countries.getCountry(selectedCountry.value)?.timezones || [];
      setTimezones(countryTimezones);
    }
  }, [selectedCountry]);


  useEffect(() => {
    if (selectedTimezone) {
      const interval = setInterval(() => {
        const now = new Date();
        const localTime = new Date(
          now.toLocaleString("en-US", { timeZone: selectedTimezone })
        );
        setCurrentTime(localTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedTimezone]);

  return (
    <AppContainer>
      <h1>World Clock</h1>
      <DropdownWrapper>
        <label>Select Country:</label>
        <Select
          options={countryOptions}
          onChange={(selected) => setSelectedCountry(selected)}
          value={selectedCountry}
          placeholder="Search or select a country"
        />
      </DropdownWrapper>

      {timezones.length > 0 && (
        <DropdownWrapper>
          <label>Select Timezone:</label>
          <Select
            options={timezones.map((timezone) => ({
              value: timezone,
              label: timezone,
            }))}
            onChange={(selected) => setSelectedTimezone(selected.value)}
            value={
              selectedTimezone
                ? { value: selectedTimezone, label: selectedTimezone }
                : null
            }
            placeholder="Select a timezone"
          />
        </DropdownWrapper>
      )}

      {selectedTimezone && <AnalogClock time={currentTime} />}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const DropdownWrapper = styled.div`
  margin: 20px auto;
  width: 300px;
  text-align: left;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .react-select__control {
    border: 2px solid #007bff;
    border-radius: 5px;
    box-shadow: none;

    &:hover {
      border-color: #0056b3;
    }
  }

  .react-select__menu {
    z-index: 100;
  }
`;

export default App;
