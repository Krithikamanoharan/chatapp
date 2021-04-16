import React from 'react';
//import './Person.css';
//import Radium from 'radium';
import styled from 'styled-components';

//styled object on which the method div() is called, but using backticks(tagged templates)
const StyledDiv= styled.div`
width: 60%;
border: 2px solid #eee;
text-align: center;
margin: 16px auto;
padding:20px;
box-shadow:0 2px 3px #ccc

'@media (min-width: 500px)':{
    width:'450px'
}
`
//function, so no need of Component from react.
//props is an argument that takes data from outside(App.js) and gives access to them here=>allows re-rendering.
const person = (props)=>{
    // const style={
    //     '@media (min-width: 500px)':{
    //         width:'450px'
    //     }
    // }
    return (
    //<div className="Person" style={style}>
    <StyledDiv>
    <p1 onClick={props.click}>I am {props.name} and I am {props.age} years old.</p1>
    <p>{props.children}</p>
    <input type="text" onChange={props.changed} value={props.name}/>
    
    </StyledDiv>
    //</div>
    );
}
export default person;
//export default Radium(person);