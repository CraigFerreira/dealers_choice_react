import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

document.getElementById('app')

class App extends React.Component{
    constructor(){
        super();
        this.state={
            authors: []
        };
    }
    async componentDidMount(){
        const authors= (await axios.get('/api/data')).data
        // console.log('yea buddy',authors)
        this.setState({authors});
    }

    async deleteAuthor(e){
        console.log('index is ', e)
        const authors=[...this.state.authors]
        authors.splice(e, 1)
        this.setState({authors})
        await axios.post('api/delete', {e})
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
                <ul>
                    {
                        authors.map((author, idx)=>{
                            return (
                                <li key={idx}>
                                    {author.name}
                                    <br>
                                    </br>

                                    <button onClick={this.deleteAuthor.bind(this, idx)}>Delete Author</button>
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

