import Die from 'components/Die.jsx'
import { nanoid } from 'nanoid'
import fireConfetti from 'services/confetti.js'
import { useEffect } from 'react'
import { useState } from 'react'

const DIE_COUNT = 12

const App = () => {
  const [diceArr, setDiceArr] = useState(setFirstDieArray())
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const possibleWinnerDieValue = diceArr[0].value
    const isGameOverCase = diceArr.every(die => die.isLocked && die.value === possibleWinnerDieValue)

    if (isGameOverCase) setIsGameOver(true)
  }, [diceArr])

  function setFirstDieArray () {
    const firstDiceArr = []
    for (let i = 0; i < DIE_COUNT; i++) {
      firstDiceArr.push({
        id: nanoid(12),
        value: getRandomDieValue(),
        isLocked: false,
      })
    }

    return firstDiceArr
  }

  function getRandomDieValue () {
    return Math.floor(Math.random() * 6) + 1
  }

  function lockDie (dieId) {
    setDiceArr(prevDiceArr => prevDiceArr.map(die => die.id === dieId ? { ...die, isLocked: !die.isLocked } : die))
  }

  function rollDice () {
    if (isGameOver) return

    setDiceArr(prevDiceArr => prevDiceArr.map(die => die.isLocked ? die : { ...die, value: getRandomDieValue() }))
  }

  function resetGame () {
    setDiceArr(setFirstDieArray())
    setIsGameOver(false)
  }

  useEffect(() => {
    isGameOver && fireConfetti()
  }, [isGameOver])

  return (
    <main className='bg-blue-950 h-dvh px-4 py-4 md:px-12 md:py-12 flex flex-col items-center justify-normal gap-8'>
      <h1 className='text-white text-4xl font-bold'>Tenzies</h1>
      <div className='bg-neutral-100 container flex flex-col items-center justify-center gap-8 px-8 py-8 md:py-14 rounded-lg'>
        <p className='text-center text-neutral-500 text-xs md:text-lg'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
          {diceArr.map(die => <Die key={die.id} isLocked={die.isLocked} onClick={() => lockDie(die.id)}>{die.value}</Die>)}
        </div>
        <button className='bg-blue-950 text-white px-8 py-2 rounded-md hover:opacity-85 transition-all active:opacity-70 active:scale-95 md:text-xl' onClick={isGameOver ? resetGame : rollDice}>{isGameOver ? 'Play again!' : 'Roll'}</button>
      </div>
    </main>
  )
}

export default App
