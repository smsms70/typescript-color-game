import { useState, useEffect } from 'react'
import './styles.css'

interface Arr {
  color: string;
  winner: boolean;
}
export function App() {
  const Number: number = 8;
  const [colorArr, setColorArr] = useState(Array<Arr>);
  const [winnerColor, setWinnerColor] = useState<string>('');
  const [play, setPlay] = useState<'lose' | 'win' | ''>();
  const [score, setScore] = useState<number>(0);

  const random = (num: number): number => {
    return Math.floor(Math.random() * num)
  }
  const randomNum = (): string => {
    return `rgb(${random(256)},${random(256)},${random(256)})`
  }
  const Winner = (): string => {
    let foo = randomNum();
    setWinnerColor(foo);
    return foo;
  }
  const handleStart = (): void => {
    setColorArr([]);
    let winner: number = random(Number);
    
    for (let i = 0; i < Number; i++) {
      setColorArr(prev => [...prev, {
        color: (i === winner ? Winner() : randomNum()),
        winner: (i === winner ? true : false)
      }])
    }
  }
  useEffect(() => {
    if (play === 'win') {
      setPlay('')
      setScore(score + 10)
    } else if (play === 'lose') {
      setPlay('')
    }
    handleStart()
  }, [play])
  return (
    <main id='main-container'>
      <section id='choose-color-winner'>
        <h1>
          {winnerColor}
        </h1> 
      </section>
      <h3 className={score > 0 ? 'animated' : ''}>score: <span>{score}</span></h3>
      <section id='colors-items-container'> 
      <>
        {colorArr.map(elm => (
          <ColorItem
            key={Math.random()}
            color={elm.color}
            winner={elm.winner}
            setPlay={setPlay}
          />
        ))}
      </>
      </section>
    </main>
  )
}

interface Color extends Arr {
  setPlay: Function;
}
function ColorItem ({color, winner, setPlay}:Color) {
  const handleWinner = () => {
    if (winner) {
      setPlay('win')
    } else {
      setPlay('lose')
    }
  }
  return(
    <div className='Item-color' style={{backgroundColor: color}} onClick={handleWinner}></div>
  )
}