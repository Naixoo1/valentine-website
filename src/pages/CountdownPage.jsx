import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CountdownPage.css'

const CountdownPage = ({ onCountdownComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2026-02-14T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setIsComplete(true)
        onCountdownComplete()
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeRemaining({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [onCountdownComplete])

  if (isComplete) {
    return null
  }

  return (
    <div className="countdown-container">
      {/* Floating Hearts */}
      <div className="countdown-hearts">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="countdown-heart" 
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 30}px`
            }}
          >
            💝
          </div>
        ))}
      </div>

      <motion.div 
        className="countdown-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Title */}
        <motion.h1 
          className="countdown-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Something Special Is Coming... 💕
        </motion.h1>

        <motion.p 
          className="countdown-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          A surprise just for you on Valentine's Day!
        </motion.p>

        {/* Countdown Display */}
        <motion.div 
          className="countdown-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="countdown-item">
            <div className="countdown-number">{timeRemaining.days}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">{String(timeRemaining.hours).padStart(2, '0')}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">{String(timeRemaining.minutes).padStart(2, '0')}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-item">
            <div className="countdown-number">{String(timeRemaining.seconds).padStart(2, '0')}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.p 
          className="countdown-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Until February 14, 2026 at midnight 🌙✨
        </motion.p>

        {/* Decorative Hearts */}
        <div className="countdown-decorative-hearts">
          <span className="deco-heart">💖</span>
          <span className="deco-heart">💕</span>
          <span className="deco-heart">💗</span>
        </div>
      </motion.div>
    </div>
  )
}

export default CountdownPage
