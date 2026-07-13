import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  // 1. Use React state so the UI actually updates when the counter changes
  const [counter, setCounter] = useState(15)

  const addValue = () => {
    // 2. Fixed capitalization of Math.random()
    console.log("value added", Math.random()); 
    // 3. Update the state
    setCounter(counter + 1);
  }

  const removeValue = () => {
    setCounter(counter - 1);
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value: {counter}</h2>
      {/* 4. Moved onClick inside the button tag */}
      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App