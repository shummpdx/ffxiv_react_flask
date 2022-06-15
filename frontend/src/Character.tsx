import React, { useState, useEffect } from "react";
import { SearchForm } from "./SearchForm";
import { characterSearch, profileSearch } from "./services/characterSearch";
import { retreiveProfile, storeProfile } from "./services/databaseServices";
import random from 'lodash.random'
import { DisplayProfile } from "./DisplayProfile";

const initialSearchState = {
  name: "",
  server:"", 
};

const initialProfileState = {
  id: 0,
  name: "",
  job: "",
  level: 0,
  portrait: "",
  titleId: 0,
};

export default function FFXIVSearch() {

  const [search, setSearch] = useState(initialSearchState);
  const [submitted, setSubmitted] = useState(false);
  const [profile, getProfiles] = useState('');

  const searchId = random(0,100000);

  const  submitRequest = () => {
    characterSearch(search)
    .then((response) => {
      response.data.Results.map((result) => {
        profileSearch(result.ID)
        .catch(function(error) {
        })
        .then((result) => {
          storeProfile(result);
          retreiveProfile(search.name)
          .then((response) => {
            const allProfiles = response.data;
            console.log(allProfiles);
            setSubmitted(true);
            getProfiles(allProfiles);
          })
        })
      })
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