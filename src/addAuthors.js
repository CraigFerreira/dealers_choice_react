import React , {useState}from 'react'
import axios from 'axios'
import App from './index'


class AddAuthor extends React.Component {
  constructor(props){
    super(props)
    this.state={
      newAuthor: ''
    }
    this.addAuthors=this.addAuthors.bind(this)
    this.newAuthor= this.newAuthor.bind(this)
  }

  newAuthor(evt){
    let currAuthor= evt.target.value
    this.setState({newAuthor: currAuthor})
    console.log(this.state.newAuthor)
  }

  addAuthors(evt){
    evt.preventDefault()
    this.props.addNew(this.state.newAuthor)
    console.log(this.state.newAuthor)
  }

  render(){
    return(
        <div>
            <h3>Add Author</h3>
            <form>
                <input onChange={this.newAuthor} type='text'></input>
                <button onClick={this.addAuthors}>Add Author!</button>
            </form>
        </div>
    )
  }
}

export default AddAuthor