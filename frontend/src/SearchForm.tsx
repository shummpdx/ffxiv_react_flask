import React from 'react';

export const SearchForm = ({ search, handleInputChange, submitRequest }) => {

    return (
        <>
            <form>
                <p>
                    Name:
                    <input
                        type="text"
                        id="name"
                        required
                        onChange={handleInputChange}
                        name="name"
                        value={search.name}
                    />
                </p>

                <p>
                    Server:
                    <input
                        type="text"
                        id="server"
                        required
                        onChange={handleInputChange}
                        name="server"
                        value={search.server}
                    />
                </p>

                <button type="button" onClick={submitRequest}>Submit</button>

            </form>
        </>
    )
}