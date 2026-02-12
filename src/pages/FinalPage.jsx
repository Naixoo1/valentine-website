import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './FinalPage.css'

const FinalPage = () => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  return (
    <div className="final-container">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="confetti" 
              style={{ 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor: ['#ff69b4', '#ff1493', '#ffc0cb', '#ff69b4', '#ffb6c1'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Hearts */}
      <div className="celebration-hearts">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className="celebration-heart" 
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 40}px`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <motion.div 
        className="final-card"
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Celebration Banner */}
        <motion.div 
          className="celebration-banner"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          🎉 Yay! 🎉
        </motion.div>

        {/* Main Message */}
        <motion.div 
          className="final-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="final-title">
          你答應了！💕
          </h1>

          <p className="final-message">
            I'm so happy you'll be my Valentine! 
            This means the world to me, and I can't wait 
            to make this day (and every day) special for you.
          </p>

          <div className="hearts-explosion">
            <span>❤️</span>
            <span>💖</span>
            <span>💕</span>
            <span>💗</span>
            <span>💓</span>
            <span>💝</span>
          </div>

          <motion.div 
            className="final-image"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <div className="heart-circle">
              <span className="mega-heart">💝</span>
            </div>
          </motion.div>

          <motion.p 
            className="closing-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Thank you for making me the happiest person alive! 
            <br />
            <strong>Happy Valentine's Day! 💖</strong>
          </motion.p>

          {/* Romantic Quote */}
          <motion.div 
            className="quote-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <p className="quote-text">
              "My world felt hollow until you stepped into it. 
              Lately, every corner of my life is glowing with your light."
            </p>
            <p className="quote-author">- Me</p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="sparkles">
          {[...Array(20)].map((_, i) => (
            <span 
              key={i} 
              className="sparkle" 
              style={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ✨
            </span>
          ))}
        </div>
      </motion.div>

      {/* Fireworks Effect */}
      <div className="fireworks">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="firework" 
            style={{ 
              left: `${20 + (i * 15)}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            💥
          </div>
        ))}
      </div>
    </div>
  )
}

export default FinalPage
