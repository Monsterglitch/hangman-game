import { Diagram } from './Diagram'
import { useState, useEffect, useCallback } from 'react'
import { useMobile } from './useMobile'
import words from "./wordList.json"
import { Word } from './Word'
import { Keyboard } from './Keyboard'
import './App.css'

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  const isMobile: boolean = useMobile();
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly"
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <div style={containerStyle}>
        <div style={{ fontSize: "1.5rem", color: "#F5F5F5", marginBottom: isMobile ? "2rem" : "0"}}>
          {isWinner && "VAA THALAIVA VAA THALAIVA🔥🔥"}
          {isLoser && "THOTHUTTEY IRUKIYE DA 🤕"}
        </div>
  
        <Diagram numberOfGuesses={incorrectLetters.length} />
  
        <div style={{ marginLeft: isMobile ? "0" : "7rem", marginTop: "1.5rem", textAlign: "center" }}>
          <Word
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
        </div>
      </div>
      
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
  
}

export default App
