import { databaseClient } from "./HttpService";

export function storeCharacters(character) {
    return databaseClient.post("/character", {id: character.id, name: character.name, avatar: character.avatar, searchId: character.searchId})
}

export function retreiveCharacters(searchId) {
    return databaseClient.post("/getCharacters", {searchId: searchId})
}  

export function storeProfile(profile) {
    return databaseClient.post("/character", {id: profile.id, titleId: profile.titleId, job: profile.job, level: profile.level, portrait: profile.portrait})
}

export function retreiveProfile(searchId) {
    return databaseClient.post("/getProfiles", {searchId: searchId})
}