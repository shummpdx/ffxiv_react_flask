import React from 'react'

export const DisplayProfile  = ( {profilesToDisplay} ) => {
    return ( 
        profilesToDisplay.map((profile) => {
            return (
                <>
                    <div className="profileContainer">
                        <div className="profile">
                            <p className="profileName">{profile.name}</p>
                            <p><img src={profile.portrait}></img></p>
                        </div>
                    </div>
                </>
            )
        })
    ) 
}