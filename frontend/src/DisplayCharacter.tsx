import React from 'react'

export const DisplayCharacter  = ( {charactersToDisplay} ) => {
    return ( 
        charactersToDisplay.map((character) => {
            return (
                <>
                    <div className="characterContainer">
                        <div className="character">
                            <p>{character.name}</p>
                            <p><img src={character.avatar}></img></p>
                        </div>
                    </div>
                </>
            )
        })
    ) 
}