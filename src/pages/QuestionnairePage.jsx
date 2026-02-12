import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { adminQuestions } from '../config/adminConfig'
import './QuestionnairePage.css'

const QuestionnairePage = ({ onComplete }) => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value)
  }

  const handleNext = () => {
    if (!currentAnswer.trim()) return

    const newAnswers = {
      ...answers,
      [adminQuestions[currentQuestion].id]: currentAnswer
    }
    setAnswers(newAnswers)
    
    if (currentQuestion < adminQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setCurrentAnswer('')
    } else {
      // Save all answers to localStorage
      localStorage.setItem('userAnswers', JSON.stringify(newAnswers))
      onComplete()
      navigate('/music')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(answers[adminQuestions[currentQuestion - 1].id] || '')
    }
  }

  const progress = ((currentQuestion + 1) / adminQuestions.length) * 100

  return (
    <div className="questionnaire-container">
      <div className="floating-hearts">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}>
            💕
          </div>
        ))}
      </div>

      <motion.div 
        className="questionnaire-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <h1 className="questionnaire-title">
          A Few Questions For You 💝
        </h1>

        <p className="question-counter">
          Question {currentQuestion + 1} of {adminQuestions.length}
        </p>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="question-container"
        >
          <h2 className="question-text">
            {adminQuestions[currentQuestion].question}
          </h2>

          {adminQuestions[currentQuestion].type === 'textarea' ? (
            <textarea
              className="answer-input textarea"
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder="Type your answer here..."
              rows={6}
            />
          ) : adminQuestions[currentQuestion].type === 'number' ? (
            <input
              type="number"
              className="answer-input"
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder="Enter a number..."
              min="1"
              max="10"
            />
          ) : (
            <input
              type="text"
              className="answer-input"
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder="Type your answer here..."
            />
          )}
        </motion.div>

        <div className="button-container">
          {currentQuestion > 0 && (
            <button className="btn btn-secondary" onClick={handlePrevious}>
              ← Previous
            </button>
          )}
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            disabled={!currentAnswer.trim()}
          >
            {currentQuestion === adminQuestions.length - 1 ? 'Complete 💖' : 'Next →'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default QuestionnairePage
