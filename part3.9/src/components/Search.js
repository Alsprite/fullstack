import React from 'react'

const Search = (props) => {
    return (
        <div>
            <form>
                <ul>
                    Filter shown with
                <input value={props.newSearch} onChange={props.handleSearch}/>
                </ul>
                
            </form>
        </div>
    )
}

export default Search