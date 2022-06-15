import { databaseClient } from "./HttpService";

export function storeProfile(profile) {
    return databaseClient.post("/profile", 
    {
        id: profile.data.Character.ID, 
        name: profile.data.Character.Name,
        titleId: profile.data.Character.Title, 
        job: profile.data.Character.ActiveClassJob.UnlockedState.Name, 
        level: profile.data.Character.ActiveClassJob.Level, 
        portrait: profile.data.Character.Portrait,
    })
}

export function retrieveProfile(name) {
    return databaseClient.post("/getProfiles", 
    {
        name: name,
    })
}