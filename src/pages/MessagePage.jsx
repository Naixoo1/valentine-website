import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { adminMessage } from '../config/adminConfig'
import './MessagePage.css'

const MessagePage = () => {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/proposal')
  }

  return (
    <div className="message-container">
      {/* Animated Background Elements */}
      <div className="hearts-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="heart-bg" 
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${10 + Math.random() * 30}px`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <motion.div 
        className="message-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Decorative Elements */}
        <div className="corner-decoration top-left">🌹</div>
        <div className="corner-decoration top-right">🌹</div>
        <div className="corner-decoration bottom-left">💝</div>
        <div className="corner-decoration bottom-right">💝</div>

        {/* Message Content */}
        <motion.div
          className="message-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="letter-header">
            <div className="wax-seal">💌</div>
            <h1 className="message-title">{adminMessage.title}</h1>
          </div>

          <div className="letter-body">
            {adminMessage.content.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                className="message-paragraph"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="signature-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="hearts-divider">
              <span>💕</span>
              <span>❤️</span>
              <span>💕</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="message-button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <button className="message-continue-btn" onClick={handleContinue}>
            Continue 💖
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Petals */}
      <div className="petals-container">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="petal" 
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessagePage
