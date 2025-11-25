'use client'

import { useState, useEffect } from 'react'
import { characters, characterDict, CharacterInfo } from './data/characters'

export default function Home() {
  const [highlightedCount, setHighlightedCount] = useState(0)
  const [highlightedChars, setHighlightedChars] = useState<Set<string>>(new Set())
  const [showCard, setShowCard] = useState(false)
  const [currentChar, setCurrentChar] = useState<string>('')
  const [currentInfo, setCurrentInfo] = useState<CharacterInfo | null>(null)

  const handleCharacterClick = (char: string) => {
    const newHighlighted = new Set(highlightedChars)
    
    if (newHighlighted.has(char)) {
      newHighlighted.delete(char)
      setHighlightedCount(prev => prev - 1)
    } else {
      newHighlighted.add(char)
      setHighlightedCount(prev => prev + 1)
    }
    
    setHighlightedChars(newHighlighted)
    
    // Show meaning card
    const info = characterDict[char] || { meaning: 'Unknown', pinyin: '' }
    setCurrentChar(char)
    setCurrentInfo(info)
    setShowCard(true)
    
    // Auto-hide after 2.5 seconds
    setTimeout(() => {
      setShowCard(false)
    }, 2500)
  }

  const handleReset = () => {
    setHighlightedChars(new Set())
    setHighlightedCount(0)
  }

  const handleCloseCard = () => {
    setShowCard(false)
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Chinese Character Game</h1>
        <p className="subtitle">Click on characters to learn their meanings</p>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-label">Highlighted</div>
          <div className="stat-value">{highlightedCount}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Total</div>
          <div className="stat-value">{characters.length}</div>
        </div>
      </div>

      <div className="character-grid">
        {characters.split('').map((char, index) => (
          <div
            key={`${char}-${index}`}
            className={`character-card ${highlightedChars.has(char) ? 'highlighted' : ''}`}
            onClick={() => handleCharacterClick(char)}
          >
            <span>{char}</span>
          </div>
        ))}
      </div>

      {highlightedCount > 0 && (
        <button className="reset-btn" onClick={handleReset}>
          Reset All
        </button>
      )}

      <div 
        className={`overlay ${showCard ? 'show' : ''}`}
        onClick={handleCloseCard}
      />

      {showCard && currentInfo && (
        <div className={`meaning-card ${showCard ? 'show' : ''}`}>
          <span className="close-btn" onClick={handleCloseCard}>&times;</span>
          <div className="character">{currentChar}</div>
          <div className="meaning">{currentInfo.meaning}</div>
          {currentInfo.pinyin && (
            <div className="pinyin">{currentInfo.pinyin}</div>
          )}
        </div>
      )}
    </div>
  )
}

