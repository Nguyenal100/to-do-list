// Imported components library from react
import React, { Component } from "react";
import ListComponent from './components/ListComponent';
import './App.css';
import uniqid from "uniqid";


class App extends Component {
  // This is in the main componenet so does not need props
  constructor(){
    super();
    this.state = {
      // ToDos is an empty array that will collect value from submit button in form below
      toDos: [],
      //CurrentToDo is an object that contains two values | uniqid is from an import above for best practice
      currentToDo: {
        id: uniqid(),
        name: ""
      },
      //We are making a new state for the editToDo method
      editing: false
    };
  };
  // Creating an addToDo function
  // DO NOT EVER DO this.state =  outside of constructor which is why we use setState (a library in react)
  addToDo = () => {
    if (!this.state.currentToDo.name) {
      return;
    }
    // ... is the spead operator, it puts every items after from array into current array
    // We cloned the toDos array and appeneded the currenToDos at the end of the array like pushing the items in
    const newToDos = [
      ...this.state.toDos,
      this.state.currentToDo
    ]
    // Just making a new current to do list item
    // currentToDo is replacing the ID with a new unique ID
    this.setState({
      toDos: newToDos,
      currentToDo: {
        name: "",
        id: uniqid()
      }
    });
  };

   //If deleting item, we would want to pass in an item
  deleteToDo = (toDo) => {
    // we need to use ...this.state because if we put toDos by itself, it won't get recognized
    //Alan's method
    //const newArray = [...this.state.toDos]
    // for (let i = 0; i < this.state.toDos.length; i++) {
    //   if (this.state.toDos[i].id === toDo.id) {
    //     newArray.splice(i, 1)
    //   };
    // };

    this.setState({
      //Part of Alan's method
      //toDos because it is our array name on line 12
      //toDos: newArray,
      //Ren's Method
      //The filter method below checks for the array and we want the array that doesn't have the id we are looking for so it filters that exact id out of it hence why we used not equal too i.e !==. 
      toDos: this.state.toDos.filter(tD => tD.id !== toDo.id)

    });
    //We would take in the active list item
    //We would remove that active list item from the toDo list which is an array
    //We would loop through an array and check for the item that we want to delete, maybe like the array spot like index 
    //We do this by comparing the input to the toDo list array
  }

  // e stands for events
  // We are putting this function in onChange
  // When ever we type in the input field, the method below will update the currentToDo

  editToDo = (toDo) => {
    //We would need an edit button next to our delete button 
    //We would want to set currentToDo to our target becuase we assigned a unique ID to it in our state above Line 14
    //When we click submit button it would change the toDo in our array 
    //When we click any edit button, the submit button would need to change to resubmit
    //We now have to consider adding more items to our state because the submit button will be dynamic
    this.setState({
      editing: true,
      
      currentToDo: {
        name: toDo.name,
        id: toDo.id
      }
    });

  };

  resubmitToDo = () => {
    if (!this.state.currentToDo.name) {
      return;
    }
    const newToDos = [
      ...this.state.toDos,
    ]
    
    // for (let i = 0; i < this.state.toDos.length; i++) {
    //   if (this.state.toDos[i].id === this.state.currentToDo.id) {
    //     this.state.toDos[i].name = this.state.currentToDo.name
    //   };
    // };

    newToDos.filter(td => td.id === this.state.currentToDo.id).map(td => td.name = this.state.currentToDo.name);

    this.setState({
      toDos: newToDos,
      currentToDo: {
        name: "",
        id: uniqid()
      }
    });
  };

  updateCurrentToDo = (e) => {
    this.setState({
      currentToDo: {
        name: e.target.value,
        id: this.state.currentToDo.id
      }
    });
  };

  // This method prevents the form from refreshing
  handleSubmit = (e) => {
    e.preventDefault();
  };

  //Since this is a class we need render
  render(){
    


    let button;
      if (this.state.editing) {
         button = <input type="submit" onClick={this.resubmitToDo} value="Resubmit"/>
        }
      else {
        button = <input type="submit" onClick={this.addToDo} value="Submit" />
      };
    return (
      <div className="App">
        {/* Simple Form Skeleton to get us started in JSX */}
        <form onSubmit={this.handleSubmit}>
          <label>
            {/* value function below clears out the input so when currentToDo changes, it will also change the input value or clear out that field */}
            <input type="text" value={this.state.currentToDo.name} onChange={this.updateCurrentToDo} name="name" />
          </label>
          {button}
        </form>
        <ListComponent toDos = {this.state.toDos} deleteToDo = {this.deleteToDo} editToDo = {this.editToDo}/>
      </div>
    );
  };
  
};

export default App;
