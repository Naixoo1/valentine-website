import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProposalPage.css'

const ProposalPage = () => {
  const navigate = useNavigate()
  const [noCount, setNoCount] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [noSize, setNoSize] = useState(1)

  const handleYesClick = () => {
    // Save the answer and navigate to final page
    localStorage.setItem('valentineAnswer', 'yes')
    navigate('/final')
  }

  const handleNoClick = () => {
    // Increase yes button size and decrease no button size
    setNoCount(noCount + 1)
    setYesSize(yesSize + 0.4)
    setNoSize(Math.max(0.1, noSize - 0.2))
  }

  return (
    <div className="proposal-container">
      {/* Animated Hearts Background */}
      <div className="hearts-rain">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="heart-rain" 
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              fontSize: `${15 + Math.random() * 25}px`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <motion.div 
        className="proposal-card"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Cupid Arrow */}
        <motion.div 
          className="cupid-arrow"
          initial={{ rotate: -45, x: -100, y: -100 }}
          animate={{ rotate: 0, x: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
        >
          💘
        </motion.div>

        {/* Main Question */}
        <motion.h1 
          className="proposal-question"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          你愿意与我共度情人节吗?
        </motion.h1>

        {/* Cute Message */}
        <motion.p 
          className="proposal-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {noCount === 0 && "我保證每天都讓你開心！ 🥰"}
          {noCount === 1 && "拜託？你讓我心跳都漏了一拍！ 💓"}
          {noCount === 2 && "拜託，你知道你想說「我願意」！ 😊"}
          {noCount === 3 && "我姑且認為這是在暗示……最後會變成肯定？ 🤗"}
          {noCount >= 4 && "現在看來，「是」按鈕確實很不錯，不是嗎？ 😏"}
        </motion.p>

        {/* Buttons Container */}
        <motion.div 
          className="buttons-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Yes Button */}
          <motion.button
            className="yes-button"
            onClick={handleYesClick}
            animate={{ scale: yesSize }}
            whileHover={{ scale: yesSize * 1.1 }}
            whileTap={{ scale: yesSize * 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Yes! 💖
          </motion.button>

          {/* No Button - Always visible but keeps shrinking */}
          <motion.button
            className="no-button"
            onClick={handleNoClick}
            animate={{ 
              scale: noSize
            }}
            whileHover={{ scale: noSize * 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            No
          </motion.button>
        </motion.div>

        {/* Encouraging Text */}
        {noCount >= 3 && (
          <motion.p 
            className="hint-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hint: The "No" button is getting pretty small... 👀
          </motion.p>
        )}

        {/* Decorative Elements */}
        <div className="decorative-hearts">
          <span className="deco-heart heart-1">💕</span>
          <span className="deco-heart heart-2">💗</span>
          <span className="deco-heart heart-3">💓</span>
          <span className="deco-heart heart-4">💝</span>
        </div>
      </motion.div>

      {/* Floating Rose Petals */}
      <div className="rose-petals">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="rose-petal" 
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            🌹
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProposalPage