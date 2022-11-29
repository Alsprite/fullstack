import React from 'react'

const Search = (props) => {
    return (
        <div>
            <form>
                Filter shown with
                <input value={props.newSearch} onChange={props.handleSearch} />
            </form>
        </div>
    )
}

export default Search