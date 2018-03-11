import React, { Component } from 'react';
import ListItems from './components/ListItems';
import NewItem from './components/NewItem';
import ClearItem from './components/ClearItem';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()

    this.state = {
      toDos: [],
      input: '',
    }
  }

  submitItem = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/add", {
      toDos: this.state.input,
      status: false
    })
      .then((response) => {
        this.setState({
          toDos: this.state.toDos.concat(response.data),
          input: ''
        })
      })
  }

  componentWillMount() {
    axios.get("http://localhost:8080/")
      .then((res) => {
        this.setState({
          toDos: res.data
        })
      })
  }

  checkBox = (id) => {
    axios.post("http://localhost:8080/update", {
      id: this.state.toDos[id].id,
      status: !this.state.toDos[id].status
    })
      .then((response) => {
        this.setState({
          toDos: response.data
        })
      })
  }

  clearItem = () => {
    axios.get("http://localhost:8080/clear")
      .then((response) => {
        this.setState({
          toDos: response.data
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (

      <div className="App">
        <h1>To-do's to do</h1>
        <NewItem submitItem={this.submitItem}
          handleChange={this.handleChange}
          input={this.state.input} />

        <ClearItem clearItem={this.clearItem} />

        <ListItems toDos={this.state.toDos}
          checkBox={this.checkBox} />
      </div>
    );
  }
}

export default App;
