import React, { useState } from "react";
import { SearchForm } from "./SearchForm";
import { characterSearch, profileSearch } from "./services/characterSearch";
import { retrieveProfile, storeProfile } from "./services/databaseServices";
import { DisplayProfile } from "./DisplayProfile";

const initialSearchState = {
  name: "",
  server:"", 
};

export default function FFXIVSearch() {

  const [search, setSearch] = useState(initialSearchState);
  const [submitted, setSubmitted] = useState(false);
  const [profile, getProfiles] = useState('');

  const  submitRequest = () => {
    characterSearch(search)
    .then((response) => {
      response.data.Results.map((result) => (
        profileSearch(result.ID)
        .catch(function(error) {
        })
        .then((result) => {
          storeProfile(result);
          retrieveProfile(search.name)
          .then((response) => {
            const allProfiles = response.data;
            console.log(allProfiles);
            setSubmitted(true);
            getProfiles(allProfiles);
          })
        })
      ))
   })
  } 

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  }

  const resetPage = () => {
    setSubmitted(false);
  } 

  return (
    <>
      {submitted ? (
        <>
          <div className="displayContainer">
            <div className="display">
              {/*<DisplayCharacter charactersToDisplay={charactersToDisplay} />*/}
              <DisplayProfile profilesToDisplay={profile} />
            </div>
          </div>
          <button type="button" onClick={resetPage}>Reset</button>   
        </>
      ) : (
        <>
        <h3> FFXIV Character Search </h3>
        <SearchForm handleInputChange={handleInputChange} search={search} submitRequest={submitRequest}/> 
      </>
      )}
    </>
  )
}