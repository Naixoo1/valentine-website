import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CountdownPage from './pages/CountdownPage'
import QuestionnairePage from './pages/QuestionnairePage'
import MusicAndPhotosPage from './pages/MusicAndPhotosPage'
import MessagePage from './pages/MessagePage'
import ProposalPage from './pages/ProposalPage'
import FinalPage from './pages/FinalPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [questionsAnswered, setQuestionsAnswered] = useState(false)
  const [countdownComplete, setCountdownComplete] = useState(false)

  useEffect(() => {
    // Check if questions have been answered
    const answered = localStorage.getItem('questionsAnswered')
    setQuestionsAnswered(answered === 'true')

    // Check if countdown is complete
    const targetDate = new Date('2026-02-14T00:00:00').getTime()
    const now = new Date().getTime()
    setCountdownComplete(now >= targetDate)
  }, [])

  const handleQuestionsComplete = () => {
    localStorage.setItem('questionsAnswered', 'true')
    setQuestionsAnswered(true)
  }

  const handleCountdownComplete = () => {
    setCountdownComplete(true)
  }

  return (
    <Router>
      <Routes>
        {/* Admin route - always accessible */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Main routes - protected by countdown */}
        <Route 
          path="/" 
          element={
            !countdownComplete ? (
              <CountdownPage onCountdownComplete={handleCountdownComplete} />
            ) : (
              <QuestionnairePage onComplete={handleQuestionsComplete} />
            )
          } 
        />
        <Route 
          path="/music" 
          element={
            !countdownComplete ? (
              <Navigate to="/" />
            ) : questionsAnswered ? (
              <MusicAndPhotosPage />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/message" 
          element={
            !countdownComplete ? (
              <Navigate to="/" />
            ) : questionsAnswered ? (
              <MessagePage />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/proposal" 
          element={
            !countdownComplete ? (
              <Navigate to="/" />
            ) : questionsAnswered ? (
              <ProposalPage />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route 
          path="/final" 
          element={
            !countdownComplete ? (
              <Navigate to="/" />
            ) : (
              <FinalPage />
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
