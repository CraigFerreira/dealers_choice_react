import React , {useState}from 'react'
import axios from 'axios'
import App from './index'

// class AddAuthor extends React.Component{
//     handleSubmit(e){
//         e.preventDefault()
//         console.log(e)
//     }

//     render(){
//         return(
//             <form onSubmit={this.handleSubmit}>
//                 <h4>Add Author:</h4>
//                 <label>Author:</label>
//                 <input type='text'
//                 onChange={(e)=>{
//                     this.setState({[e.target.name]: e.target.value})
//                 }}></input>
//                 <label>Book:</label>
//                 <input type='text'></input>
//                 <button type='submit'>Add Author</button>
//             </form>
//         )
//     }
// }

class AddAuthor extends React.Component {
    constructor(props) {
      super(props);
      console.log(props)
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.props.updateAuthors= this.props.updateAuthors.bind(this)
    }
  
    handleChange(event) {
        event.preventDefault();
      this.setState({value: event.target.value});
      console.log(this.props.authors.updateAuthors())
    //   this.props.authors.updateAuthors(event.target.value)
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);

      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.updateAuthors} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default AddAuthor