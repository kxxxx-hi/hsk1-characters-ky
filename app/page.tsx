'use client'

import { useState } from 'react'
import { characters, characterDict } from './data/characters'

export default function Home() {
  const [masteredCount, setMasteredCount] = useState(0)
  const [masteredChars, setMasteredChars] = useState<Set<string>>(new Set())
  const [showMeanings, setShowMeanings] = useState<Set<string>>(new Set())

  const handleCharacterClick = (char: string) => {
    const newMastered = new Set(masteredChars)
    const newShowMeanings = new Set(showMeanings)
    
    if (newMastered.has(char)) {
      newMastered.delete(char)
      setMasteredCount(prev => prev - 1)
    } else {
      newMastered.add(char)
      setMasteredCount(prev => prev + 1)
    }
    
    // Always show meaning when clicked
    newShowMeanings.add(char)
    
    setMasteredChars(newMastered)
    setShowMeanings(newShowMeanings)
  }

  const handleReset = () => {
    setMasteredChars(new Set())
    setMasteredCount(0)
    setShowMeanings(new Set())
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">HSK 1 characters</h1>
        <p className="subtitle">Click on characters to learn their meanings</p>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-label">Mastered</div>
          <div className="stat-value">{masteredCount}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Total</div>
          <div className="stat-value">{characters.length}</div>
        </div>
      </div>

      <div className="character-grid">
        {characters.split('').map((char, index) => {
          const info = characterDict[char] || { meaning: 'Unknown', pinyin: '' }
          const isMastered = masteredChars.has(char)
          const showMeaning = showMeanings.has(char)
          
          return (
            <div
              key={`${char}-${index}`}
              className={`character-card ${isMastered ? 'mastered' : ''}`}
              onClick={() => handleCharacterClick(char)}
            >
              <div className="character-content">
                <span className="character-text">{char}</span>
                {showMeaning && (
                  <div className="character-meaning">
                    <div className="meaning-text">{info.meaning}</div>
                    {info.pinyin && (
                      <div className="pinyin-text">{info.pinyin}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {masteredCount > 0 && (
        <button className="reset-btn" onClick={handleReset}>
          Reset All
        </button>
      )}
    </div>
  )
}

