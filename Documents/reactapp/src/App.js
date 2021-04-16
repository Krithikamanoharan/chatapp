import React, { Component,useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';
//import Radium,{StyleRoot} from 'radium';

//styled components:
//styled component with dynamic function that takes props argument => for conditional styling using styled components.
const StyledButton= styled.button`
background-color: ${props=>props.alt ? 'red': 'green'};
color:black;
font:inheri;
border:2px solid blue;
padding:8px;
cursor:pointer;

&:hover{
  background-color:${props=>props.alt ? 'salmon': 'yellow'};
  color:black;
}
`;

class App extends Component {

  //special property of Class component that extends Component, used to manage components and mainly to re-render the UI when the state changes.
  state={
    //a simple array inside the property, can be a variable too.
    persons:[
      {id:'id1',name:"Krithika", age:19},
      {id:'id2',name:"Prathiksha", age:18},
      {id:'id3',name:"Sumithra",age:20}
    ],
    showPersons:false
  }

  //function to decide to show or hide the persons data div
  togglePersonsHandler=()=>{
    const doesShow=this.state.showPersons;
    this.setState({showPersons:!doesShow});

  }
//function taking an argument
  switcheNameHandler=(newName)=>{
    //console.log("switch button clicked!")
    this.setState({
      persons:[{name:newName,age:19},{name:"Prathiksha",age:18}]
    })
    
  }
  //function taking index and deleting the person
  deleteNameHandler=(personIndex)=>{

    //const persons=this.state.persons;
    //creating copy of og array instead of pointing to og array and mutating it directly is better way.
    //updating state immutably. 2 ways:
    //const persons= this.state.persons.slice()
    const persons=[...this.state.persons];
    //i.e: splice off 1 element at 2nd index (if index is 2)
    persons.splice(personIndex,1);
    this.setState({persons:persons});

  }


  //function to change the value of name to the value typed in input element.
  changedNameHandler=(event,id)=>{
    //1)find the person who's name is being changed with the id property.
    //the findIndex function is like the map function, it takes func as an argument and performs it on every element.
    //findIndex=> returns an index
    const personIndex= this.state.persons.findIndex(p=>{
      return p.id===id
    })

    //2)get the person of that index
    const person={...this.state.persons[personIndex]}

    //3)update the name of that person
    person.name=event.target.value

    //4)merge in with the persons array
    const persons=[...this.state.persons];
    persons[personIndex]=person;

    //console.log("switch button clicked!")
    this.setState({
      persons:persons
    })
    
  }
  render() {
    //dynamic classnames for styling
    //let classes=['red','bold'].join(' ');
    let classes=[]; //black if number of persons >=3
    if(this.state.persons.length<3){
      classes.push('red') //pushing 'red' to an empty array ['red']
    }
    if(this.state.persons.length<2){
      classes.push('bold') //pushing 'black' to array ['red','bold']
    }
    //inline styling
    //inline css+ normal css hover prop=> possible by the help of radium
    const style={
      backgroundColor:'green',
      color:'black',
      font:'inherit',
      border:'2px solid blue',
      padding:'8px',
      cursor:'pointer',
      
      ':hover': {
        backgroundColor:'yellow',
        color:'black'
      }
    }
    let persons=null;
    if(this.state.showPersons){
persons=(
 
    <div>
    {this.state.persons.map((person,index)=>{
      return <Person 
      click={()=>this.deleteNameHandler(index)}
      changed={(event)=>this.changedNameHandler(event,person.id)}
      name={person.name} 
      age={person.age}
      key={person.id}></Person>
    })}
{/* <Person 
        name={this.state.persons[0].name} 
        age="19"
        click={()=>this.switcheNameHandler('NewestName!')} //passing the refernce to handler function as a method to parent(Person) comp so that it cane be used in person.js
        > </Person>

        <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age}
        //click={()=>this.switcheNameHandler('NewestName!')} 
        changed={this.changedNameHandler}  //new state handler function passed to a method.
        >
        <ul><li>Dancing</li>
        <li>singing</li></ul> </Person> */}
      </div>  
  
)
style.backgroundColor='red',
style[':hover']={
  backgroundColor:'salmon',
  color:'black'
};
    }
    return (
      //try to fit all code into a single root component(div)
      //JSX code that is actually converted to JS by React before sending data to web browser.
      //look-alike of HTML.
      //onClick should be a reference to the function, not a function call itself.
      //.bind()--> to take in arguments passed to function
      //there are two ways of handling arguments passing:1)bind() and other is function call
      //2 ways to use conditional rendering to show or hide the data
      //1)ternary operator for conditional rendering checks if showpersons is true or not
      //2)instead of coding in jsx, we code in js under render() method, set persons to null and if() block to check and render the data.
      //map function of vanilla JS-> performs a func on each element of the array. (MUST RETURN SOME JSX)
      //map function can have two arguments= one is the element or item and the next is index(which helps in targeting the function to a particular item only)
     //<StyleRoot>
     <div className="App">  
        <header className="App-header">  
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className={classes.join(' ')}>Testing styles!</p>
      
        <StyledButton  alt={this.state.showPersons} key="key1" onClick={this.togglePersonsHandler}>HideOrShow</StyledButton>
        {persons}
        <button style={style} key="key2" onClick={this.switcheNameHandler.bind(this,'NewNameKrithika')}>Switch it!</button>  
       
       </div>
       //</StyleRoot>
       //Above, trying out StyledButton(styled components css) instead of normal button + inline css
    );
  }
}
export default App;
//export default Radium(App);

//function based component and managing state using useState() which can be used multiple times for multiple objects since it does'nt merge,it replaces the state!
// const App=props=>{
//     const [personsState,setPersonsState]=useState({
//       persons:[
//         {name:"Krithika",age:19},
//         {name:"Kavya",age:23},
//       ],
//       //otherState:'new state'
//     });
// const [otherState,setOtherState]=useState('new state');
// console.log(personsState,otherState);
// //function inside a function is allowed in JS.
// const switcheNameHandler=()=>{
//   setPersonsState({
//     persons:[
//       {name:"Krithsey",age:20}
//     ],
//     //otherState:personsState.otherState
//   });
// };
// return (
//         //try to fit all code into a single root component(div)
//         //JSX code that is actually converted to JS by React before sending data to web browser.
//         //look-alike of HTML.
//         //onClick should be a reference to the function, not a function call itself.
//         <div className="App">  
//           <header className="App-header">  
//             <img src={logo} className="App-logo" alt="logo" />
//             <h1 className="App-title">Welcome to React</h1>
//           </header>
//           <p className="App-intro">
//             To get started, edit <code>src/App.js</code> and save to reload.
//           </p>
//           <Person name={personsState.persons[0].name} age={personsState.persons[0].age}><ul><li>Dancing</li>
//           <li>singing</li></ul></Person>
//           <button onClick={switcheNameHandler}>Switch it!</button> 
//          </div>
//       );
    
// }
