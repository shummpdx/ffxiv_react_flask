import { ffxivAPIClient } from "./HttpService";

export function characterSearch(search) {
  const url = "https://xivapi.com/character/search?name=" + search.name + "&server=" + search.server
  return ffxivAPIClient.get(url, {})
}  

export function profileSearch(id: number) {
  const url = "https://xivapi.com/character/" + id;
  return ffxivAPIClient.get(url, {})
}

export function titleSearch(id: number) {
  const url = "https://xivapi.com/title/" + id;
  return ffxivAPIClient.get(url, {})
}