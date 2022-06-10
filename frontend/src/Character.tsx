import { render } from "@testing-library/react";
import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { SearchForm } from "./SearchForm";
import { characterSearch, profileSearch, titleSearch} from "./services/characterSearch";
import { DisplayCharacter } from "./DisplayCharacter"
import { DisplayProfile } from "./DisplayProfile";
import { retreiveCharacters, retreiveProfile, storeCharacters, storeProfile } from "./services/databaseServices";
import random from 'lodash.random'

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

const initialCharacterState = {
  id: 0,
  name: "",
  avatar: "",
  searchId: 0, 
}

export default function FFXIVSearch() {

  const [search, setSearch] = useState(initialSearchState);
  const [submitted, setSubmitted] = useState(false);
  const [character, setCharacter] = useState(initialCharacterState);
  const [charactersToDisplay, setCharactersToDisplay] = useState([]);

  const [profile, setProfile] = useState(initialProfileState);
  const [profilesToDisplay, setProfilesToDisplay] = useState([]);

  const submitRequest = () => {
    //const profileCopy = profile;
    setSubmitted(true);
    const searchId = random(0,100000);

    characterSearch(search)
    .then((response) => {
      console.log("character response: ", response)
      response.data.Results.map((results) => {
        const newCharacter = character;
        newCharacter.id = results.ID;
        newCharacter.name = results.Name;
        newCharacter.avatar = results.Avatar;
        newCharacter.searchId = searchId;
        setCharacter(newCharacter);
        storeCharacters(character);
        retreiveCharacters(searchId)
        .then((response) => {
          setCharactersToDisplay(response.data);
          profileSearch(character.id)
          .then((response) => {
            const newProfile = profile;
            newProfile.id = response.data.Character.ID;
            newProfile.job = response.data.Character.ActiveClassJob.UnlockedState.Name;
            newProfile.level = response.data.Character.ActiveClassJob.Level;
            newProfile.portrait = response.data.Character.Portrait;
            newProfile.titleId = response.data.Character.Title;
            newProfile.name = response.data.Character.Name;
            setProfile(newProfile);
            storeProfile(newProfile);
            retreiveProfile(searchId)
            .then((response) => {
              console.log(response)
              setProfilesToDisplay(response.data); 
            })
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

        <DisplayProfile profilesToDisplay={profilesToDisplay} />
        {/*<div className="displayContainer">
          <div className="display">
            <DisplayCharacter charactersToDisplay={charactersToDisplay} />
          </div>
        </div>*/}
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