import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import './AutoCompleted.css'
function AutoCompleted({setLocation}) {


  const [address, setAddress] = useState("")

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    let add = address.split(",");
    
    setLocation(add[0])
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
         


          <input
          style={{borderRadius: '25px',padding:'10px',border:"1px solid black",maxWdth:"360px"}}
          label="Search Places ..."
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input"
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default AutoCompleted
