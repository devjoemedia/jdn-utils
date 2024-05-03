import { useState } from 'react'
import { useToggle } from 'jdn-utils/hooks'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [value, toggle] = useToggle(false)

  return (
    <>
      <h1>jdn-utils Playground</h1>
      <h1>(Hooks & Utils)</h1>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          toggle()
        }}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
