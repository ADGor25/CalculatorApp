// Importing CSS Styling File
import './App.css';

// Importing React Framework
import React, {useState} from 'react';

// Importing Bootstrap Framework
import {Button, Container} from 'react-bootstrap';

// Main App Function
export default function App() {

  // Creating Numbers 7-9
  let numbers7_9 = [];
  for (let i = 7; i <= 9; i++) {
      numbers7_9.push( <Button className='Numbers' onClick={() => numClicked(`${i}`)} key={i}>{i}</Button>)
  }

  // Creating Numbers 4-6
  let numbers4_6 = [];
  for (let j = 4; j <= 6; j++) {
      numbers4_6.push( <Button className='Numbers' onClick={() => numClicked(`${j}`)} key={j}>{j}</Button>)
  }

  // Creating Numbers 1-3
  let numbers1_3 = [];
  for (let n = 1; n <= 3; n++) {
      numbers1_3.push( <Button className='Numbers' onClick={() => numClicked(`${n}`)} key={n}>{n}</Button>)
  }

  // Combining Numbers into an Array
  let numbers = numbers7_9.concat(numbers4_6, numbers1_3);
  
  // Creating the Main Operations
  const operators = {
    '÷': (x,y) => x ? x / y : y,
    '×': (x,y) => x ? x * y : y,
    '−': (x,y) => x ? x - y : y,
    '+': (x,y) => x ? x + y : y,
  }

  // Adding Operators into an Array
  let ops = [];
  for (let op in operators) {
    ops.push( <Button className='Operators' key={op} onClick={() => operatorClicked(op)}>{op}</Button>)
  }

  // Defining Text Variables
  const [initial, setInitial] = useState(0);
  const [text, setText] = useState(`${initial}`);
  const [operation, setOperation] = useState(undefined);
  const [result, setResult] = useState(undefined);

  // When Number is Pressed
  function numClicked(num) {
    if (text === '0'|| result) {
      setText(num);
      setResult(undefined);
    } else {
      setText(text + num);
    }
  }

  // When Operator is Pressed
  function operatorClicked(opSymbol) {
    setOperation(opSymbol);
    const operated = operators[opSymbol](initial, parseFloat(text));
    setText(`${operated}`);
    setInitial(operated);
    setResult(operated);
  }

   // When Equal Sign Button is Pressed
  function equalClicked() {
    operatorClicked(operation);
    setInitial(0);
    setOperation(undefined);
  }

  // When All Clear Button is Pressed
  function allClear() {
    setInitial(0);
    setResult(undefined);
    setText(`${initial}`);
  }

  // When Sign Change Button is Pressed
  const signChange = () => {setText(`${-text}`)}

  // When Percentage Button is Pressed
  const percentClicked = () => {setText(`${text/100}`)}

  // When Decimal Button is Pressed
  const decClicked = () => {setText(text + '.')}

  // Rendering of Components
  return (

    // App View
    <div className='App'>

      {/* Calculator Container */}
      <Container className='Container'>

        {/* Output Container */}
        <Container className='Text-Container'>

          {/* Output Text */}
          <text className='Display'>{text}</text>

        </Container>

        {/* Top Button Container */}
        <Container className='Top-Button-Container'>

          {/* All-Clear Button */}
          <Button className='Top-Buttons' onClick={() => allClear()}>AC</Button>

          {/* Sign Change Button */}
          <Button className='Top-Buttons' onClick={() => signChange()}>+/-</Button>

          {/* Percent Button */}
          <Button className='Top-Buttons' onClick={() => percentClicked()}>%</Button>

        </Container>

        {/* Number Container */}
        <Container className='Num-Container'>

          {/* Outputting Numbers */}
          {numbers}

        </Container>

        {/* Operator Container */}
        <Container className='Op-Container'>

          {/* Outputting Operators */}
          {ops}

        </Container>

        {/* Button Button Container */}
        <Container className='Bottom-Buttons-Container'>

          {/* Zero Button */}
          <Button className='Zero' onClick={()=> numClicked(0)}><text>0</text></Button>

          {/* Decimal Button */}
          <Button className='Numbers' onClick={()=> decClicked()}>.</Button>

          {/* Equal Sign Button */}
          <Button className='Operators' onClick={()=> equalClicked()}>=</Button>

        </Container>

      </Container>

    </div>
  );
}