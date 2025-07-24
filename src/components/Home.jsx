import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = Country.getCountryByCode(countryCode);
    const statesOfCountry = State.getStatesOfCountry(countryCode);

    setSelectedCountryCode(countryCode);
    setFormData({ country: country.name, state: "", city: "" });
    setStates(statesOfCountry);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const state = states.find((s) => s.isoCode === stateCode);

    const citiesOfState = City.getCitiesOfState(
      selectedCountryCode,
      stateCode
    );

    setSelectedStateCode(stateCode);
    setFormData((prev) => ({
      ...prev,
      state: state.name,
      city: "",
    }));
    setCities(citiesOfState);
  };

  const handleCityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Country:", formData.country);
    console.log("Country Code:", selectedCountryCode);
    console.log("Selected State:", formData.state);
    console.log("State Code:", selectedStateCode);
    console.log("Selected City:", formData.city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border border-gray-300 shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Address Form</h2>

      {/* Country */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Country</label>
        <select
          value={selectedCountryCode}
          onChange={handleCountryChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">State</label>
        <select
          value={selectedStateCode}
          onChange={handleStateChange}
          disabled={!states.length}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">City</label>
        <select
          value={formData.city}
          onChange={handleCityChange}
          disabled={!cities.length}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};


