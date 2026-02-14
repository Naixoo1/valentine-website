import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QuestionnairePage from './pages/QuestionnairePage'
import MusicAndPhotosPage from './pages/MusicAndPhotosPage'
import MessagePage from './pages/MessagePage'
import ProposalPage from './pages/ProposalPage'
import FinalPage from './pages/FinalPage'
import AdminPage from './pages/AdminPage'
import { syncLocalStorageToSupabase } from './lib/valentineService'

function App() {
  const [questionsAnswered, setQuestionsAnswered] = useState(false)

  useEffect(() => {
    // Sync any existing localStorage data to Supabase right away
    // (so her previous answers show on admin without refilling)
    syncLocalStorageToSupabase()

    // Check if questions have been answered
    const answered = localStorage.getItem('questionsAnswered')
    setQuestionsAnswered(answered === 'true')
  }, [])

  const handleQuestionsComplete = () => {
    localStorage.setItem('questionsAnswered', 'true')
    setQuestionsAnswered(true)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <QuestionnairePage onComplete={handleQuestionsComplete} />
          } 
        />
        <Route 
          path="/music" 
          element={
            questionsAnswered ? <MusicAndPhotosPage /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/message" 
          element={
            questionsAnswered ? <MessagePage /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/proposal" 
          element={
            questionsAnswered ? <ProposalPage /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/final" 
          element={<FinalPage />} 
        />
        <Route 
          path="/admin" 
          element={<AdminPage />} 
        />
      </Routes>
    </Router>
  )
}

export default App
