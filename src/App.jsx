import Die from 'components/Die.jsx'
import { useState } from 'react'

const DIE_COUNT = 10

const App = () => {
  const [diceArr, setDiceArr] = useState(setFirstDieArray())

  function setFirstDieArray () {
    const firstDiceArr = []
    for (let i = 0; i < DIE_COUNT; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1
      firstDiceArr.push({
        // id: ADD nanoid
        value: randomNum,
        isLocked: false,
      })
    }

    return firstDiceArr
  }

  return (
    <div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div>
        {diceArr.map(die => <Die )}
        <Die />
      </div>
    </div>
  )
}

export default App
