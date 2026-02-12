import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminQuestions } from '../config/adminConfig'
import './AdminPage.css'

const AdminPage = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [userAnswers, setUserAnswers] = useState(null)
  const [valentineAnswer, setValentineAnswer] = useState(null)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const ADMIN_PASSWORD = 'valentine2026'

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadAnswers()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        loadAnswers()
        setLastUpdate(new Date())
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const loadAnswers = () => {
    const answers = localStorage.getItem('userAnswers')
    const vAnswer = localStorage.getItem('valentineAnswer')
    
    if (answers) {
      setUserAnswers(JSON.parse(answers))
    }
    if (vAnswer) {
      setValentineAnswer(vAnswer)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      loadAnswers()
      setError('')
    } else {
      setError('Incorrect password!')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    navigate('/')
  }

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem('userAnswers')
      localStorage.removeItem('valentineAnswer')
      localStorage.removeItem('questionsAnswered')
      setUserAnswers(null)
      setValentineAnswer(null)
      alert('All data cleared!')
    }
  }

  const exportData = () => {
    const data = {
      answers: userAnswers,
      valentineAnswer: valentineAnswer,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `valentine-answers-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-icon">🔐</div>
          <h1 className="admin-login-title">Admin Dashboard</h1>
          <p className="admin-login-subtitle">Enter password to access</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="admin-password-input"
              autoFocus
            />
            
            {error && <p className="admin-error">{error}</p>}
            
            <button type="submit" className="admin-login-btn">
              Login
            </button>
          </form>

          <button className="admin-back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Dashboard
  const answeredCount = userAnswers ? Object.keys(userAnswers).length : 0
  const totalQuestions = adminQuestions.length
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>💝 Admin Dashboard</h1>
          <p>Monitor responses in real-time</p>
        </div>
        <div className="admin-header-right">
          <div className="admin-update-info">
            <span>🔄 Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card card-purple">
            <div className="admin-stat-icon">📝</div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{answeredCount}/{totalQuestions}</div>
              <div className="admin-stat-label">Questions Answered</div>
              <div className="admin-stat-progress">
                <div 
                  className="admin-stat-progress-bar"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="admin-stat-card card-pink">
            <div className="admin-stat-icon">💕</div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{valentineAnswer ? 'YES!' : 'Waiting'}</div>
              <div className="admin-stat-label">Proposal Answer</div>
              <div className={`admin-stat-badge ${valentineAnswer ? 'badge-success' : 'badge-waiting'}`}>
                {valentineAnswer ? '✓ Accepted' : '⏳ Pending'}
              </div>
            </div>
          </div>

          <div className="admin-stat-card card-blue">
            <div className="admin-stat-icon">📊</div>
            <div className="admin-stat-content">
              <div className="admin-stat-number">{userAnswers ? '100%' : '0%'}</div>
              <div className="admin-stat-label">Data Collected</div>
              <div className={`admin-stat-badge ${userAnswers ? 'badge-success' : 'badge-waiting'}`}>
                {userAnswers ? '✓ Complete' : '⏳ Incomplete'}
              </div>
            </div>
          </div>
        </div>

        {/* Valentine Answer */}
        <div className="admin-section">
          <h2 className="admin-section-title">💖 Valentine Proposal</h2>
          <div className={`admin-proposal-status ${valentineAnswer ? 'status-yes' : 'status-waiting'}`}>
            <div className="admin-proposal-icon">
              {valentineAnswer ? '🎉' : '⏳'}
            </div>
            <div className="admin-proposal-content">
              {valentineAnswer ? (
                <div>
                  <h3>She Said YES! 💖</h3>
                  <p>Congratulations! She accepted your Valentine's proposal!</p>
                </div>
              ) : (
                <div>
                  <h3>Waiting for Response...</h3>
                  <p>She hasn't answered the proposal question yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Questionnaire Answers */}
        <div className="admin-section">
          <h2 className="admin-section-title">📝 Questionnaire Responses</h2>
          
          {userAnswers ? (
            <div className="admin-answers-grid">
              {adminQuestions.map((question) => (
                <div key={question.id} className="admin-answer-card">
                  <div className="admin-answer-header">
                    <span className="admin-answer-number">Q{question.id}</span>
                    <span className={`admin-answer-status ${userAnswers[question.id] ? 'answered' : 'unanswered'}`}>
                      {userAnswers[question.id] ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="admin-answer-question">
                    {question.question}
                  </div>
                  <div className="admin-answer-response">
                    {userAnswers[question.id] ? (
                      <p>{userAnswers[question.id]}</p>
                    ) : (
                      <em className="admin-no-answer">No answer yet</em>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">📭</div>
              <h3>No Responses Yet</h3>
              <p>Answers will appear here when she completes the questionnaire.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="admin-section">
          <h2 className="admin-section-title">⚙️ Actions</h2>
          <div className="admin-actions-grid">
            <button 
              className="admin-action-btn btn-export"
              onClick={exportData}
              disabled={!userAnswers && !valentineAnswer}
            >
              <span className="admin-action-icon">📥</span>
              <div className="admin-action-text">
                <strong>Export Data</strong>
                <small>Download as JSON</small>
              </div>
            </button>
            
            <button 
              className="admin-action-btn btn-refresh"
              onClick={loadAnswers}
            >
              <span className="admin-action-icon">🔄</span>
              <div className="admin-action-text">
                <strong>Refresh Now</strong>
                <small>Update data</small>
              </div>
            </button>
            
            <button 
              className="admin-action-btn btn-clear"
              onClick={clearAllData}
            >
              <span className="admin-action-icon">🗑️</span>
              <div className="admin-action-text">
                <strong>Clear Data</strong>
                <small>Reset everything</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
