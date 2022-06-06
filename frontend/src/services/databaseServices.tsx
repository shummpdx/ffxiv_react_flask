import { databaseClient } from "./HttpService";

export async function storeCharacters(character) {
    return databaseClient.post("/character", {id: character.id, name: character.name, avatar: character.avatar, searchId: character.searchId})
}

export async function retreiveCharacters(searchId) {
    return databaseClient.post("/getCharacters", {searchId: searchId})
}  