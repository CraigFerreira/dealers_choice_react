import React from 'react'

class AddAuthor extends React.Component{
    render(){
        return(
            <div>
                <h4>Add Author:</h4>
                <label>Author:</label>
                <input type='text'></input>
                <label>Book:</label>
                <input type='text'></input>
                <button>Add Author</button>
            </div>
        )
    }
}

export default AddAuthor