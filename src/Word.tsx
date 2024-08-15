import { useMobile } from "./useMobile"

type WordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function Word({ guessedLetters, wordToGuess, reveal = false, }: WordProps) {
    const isMobile: boolean = useMobile()
    return (
        <div
            style={{
                display: "flex",
                gap: ".25em",
                fontSize: isMobile ? "3rem" : "5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}
        >
        {wordToGuess.split("").map((letter, index) => (
            <span style={{ borderBottom: ".1em solid #F5F5F5" }} key={index}>
                <span
                    style={{
                    visibility:
                        guessedLetters.includes(letter) || reveal
                        ? "visible"
                        : "hidden",
                    color:
                        !guessedLetters.includes(letter) && reveal ? "red" : "#F5F5F5",
                    }}
                >
                {letter}
              </span>
            </span>
          ))}
        </div>
    )
}