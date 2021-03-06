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
        this.addNewAuthor=this.addNewAuthor.bind(this)
    }
    async componentDidMount(){
        const authors= (await axios.get('/api/data')).data
        // console.log('yea buddy',authors)
        this.setState({authors});
    }

    addNewAuthor(author){
        const modAuthors= [...this.state.authors]
        let len=modAuthors.length
        let currAuthor={id: len, name: author}
        let newAuthors=[...modAuthors, currAuthor]
        console.log('after array spread',newAuthors)
        this.setState({authors: newAuthors})
        console.log('after state change using set state',this.state.authors)
    }

    async deleteAuthor(id){
        console.log('index is ', id)
        const authors=[...this.state.authors]
        authors.splice(id, 1)
        this.setState({authors})
        await axios.delete(`/api/authors/${id+1}`)
    }

    render(){
        const {authors}=this.state;
        return(
            <div>
                <h1>Authors and Books</h1>
                <AddAuthor addNew={this.addNewAuthor}/>
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

