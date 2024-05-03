import './style.css'
import { setupCounter } from './counter.ts'
import { toUppercase } from 'jdn-utils/utils'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <h1>jdn-utils Playground</h1>
    <h1>(Utils)</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const testString = 'james'

console.log(toUppercase(testString)) 