import React from 'react'

export const DisplayProfiles  = ( {profilesToDisplay} ) => {
    return ( 
        profilesToDisplay.map((profile) => {
            return (
                <>
                    <div className="profileContainer">
                        <div className="profile">
                            <p>{profile.name}</p>
                            <p><img src={profile.avatar}></img></p>
                        </div>
                    </div>
                </>
            )
        })
    ) 
}