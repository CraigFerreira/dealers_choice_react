import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddAuthor from './addAuthors.js'

document.getElementById('app')

class App extends React.Component{
    constructor(){
        super();
        this.state={
            authors: []
        };
        // this.updateAuthors=this.updateAuthors.bind(this)
    }
    async componentDidMount(){
        const authors= (await axios.get('/api/data')).data
        // console.log('yea buddy',authors)
        this.setState({authors});
    }

    // async updateAuthors(author){
    //     // const updatedAuthors=[...this.state.authors]
    //     // this.setState({...updatedAuthors, author})
    //     this.setState({[author.target.name]: author.target.value})
    // }

    async deleteAuthor(id){
        console.log('index is ', id)
        const authors=[...this.state.authors]
        authors.splice(id, 1)
        this.setState({authors})
        await axios.delete(`/api/authors/${id+1}`)
    }

    // deleteRow: function(index) {
    //     var contacts = [...this.state.contacts];
    //     contacts.splice(index, 1);
    //     this.setState({contacts});
    //   },

    render(){
        const {authors}=this.state;
        return(
            <div>
                <h1>Authors and Books</h1>
                {/* <AddAuthor authors={this.updatedAuthors}/> */}
                <ul>
                    {
                        authors.map((author, idx)=>{
                            return (
                                <li key={idx}>
                                    {author.name}
                                    <br>
                                    </br>

                                    <button onClick={()=>{this.deleteAuthor(idx)}}>Delete Author</button>
                                    <ul>
                                        {author.books.map((book,idx)=>{
                                            return <li key={idx}>{book.name}</li>
                                        })}
                                    </ul>
                                </li>
                            )
                        })
                    }
                    </ul>
            </div>
        )
    }
}

ReactDOM.render(<App/>, app)

