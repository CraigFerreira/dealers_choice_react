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
        console.log('yea buddy',authors)
        this.setState({authors});
    }

    render(){
        const {authors}=this.state;
        return(
            <div>
                <h1>Authors and Books</h1>
                <ul>
                    {
                        authors.map((author, idx)=>{
                            return (
                                <li key={idx}>{author.name}</li>
                            )
                        })
                    }
                    </ul>
            </div>
        )
    }
}

ReactDOM.render(<App/>, app)

