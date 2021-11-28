import React, { Component } from "react";

class ListComponent extends Component {
    render(){
        // Here we are setting up our map
        // Key helps prevent confusion in console and gives list a unique id
        const listItems = this.props.toDos.map(toDo => <li key={toDo.id}> {toDo.name} <button onClick={e => this.props.deleteToDo(toDo)} > Delete </button> <button onClick ={e => this.props.editToDo(toDo)}> Edit </button> </li>)
        return (
            <div>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default ListComponent;