import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { musicConfig, photoGallery } from '../config/adminConfig'
import './MusicAndPhotosPage.css'

const MusicAndPhotosPage = () => {
  const navigate = useNavigate()
  const [audioPlaying, setAudioPlaying] = useState(false)

  // Use the first few photos to decorate the music card itself
  const scatterPhotos = photoGallery.slice(0, 5)

  useEffect(() => {
    // Auto-scroll effect
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)

    // Try to start background music automatically
    const audio = document.getElementById('background-music')
    if (audio) {
      audio.play().catch(() => {
        // If autoplay is blocked, start it on first user click/tap
        const unlock = () => {
          audio.play().catch(() => {})
          document.removeEventListener('click', unlock)
        }
        document.addEventListener('click', unlock)
      })
    }

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', () => {})
    }
  }, [])

  const handleContinue = () => {
    navigate('/message')
  }

  // Positions for the photos that float around the main music card
  const getScatterPosition = (index) => {
    const positions = [
      { top: '-40px', left: '-140px', rotate: -14 },
      { top: '-70px', right: '-150px', rotate: 10 },
      { bottom: '-40px', left: '-150px', rotate: 12 },
      { bottom: '-60px', right: '-130px', rotate: -10 },
      { top: '50%', right: '-180px', rotate: 6 }
    ]
    return positions[index % positions.length]
  }

  // Generate random positions for photos
  const getRandomPosition = (index) => {
    const positions = [
      { top: '5%', left: '5%', rotate: -8 },
      { top: '8%', right: '10%', rotate: 12 },
      { top: '25%', left: '2%', rotate: -15 },
      { top: '30%', right: '5%', rotate: 8 },
      { top: '50%', left: '8%', rotate: 10 },
      { top: '55%', right: '12%', rotate: -12 },
      { top: '75%', left: '5%', rotate: 15 },
      { top: '78%', right: '8%', rotate: -10 }
    ]
    return positions[index % positions.length]
  }

  return (
    <div className="music-photos-container">
      {/* Page Title Indicator */}
      <motion.div 
        className="page-indicator"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '50px',
          fontSize: '18px',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(255, 105, 180, 0.4)',
          zIndex: '1000'
        }}
      >
        🎵📸
      </motion.div>

      {/* Floating Hearts Background */}
      <div className="floating-hearts-bg">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="heart-float" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 20}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Music Player Section */}
      <motion.div 
        className="music-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="music-card-wrapper">
          <div className="music-card">
            <div className="vinyl-record">
              <div className="vinyl-inner"></div>
            </div>
            <h2 className="music-title">{musicConfig.message}</h2>
            <div className="song-info">
              <h3>{musicConfig.songTitle}</h3>
              <p>{musicConfig.artist}</p>
            </div>
            <div className="music-note">🎵</div>
          </div>

          {/* Small scattered photos around the main music card */}
          <div className="music-photo-scatter">
            {scatterPhotos.map((photo, index) => {
              const position = getScatterPosition(index)
              return (
                <motion.div
                  key={index}
                  className="music-photo-frame"
                  style={{
                    top: position.top,
                    bottom: position.bottom,
                    left: position.left,
                    right: position.right,
                    transform: `rotate(${position.rotate}deg)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + (index * 0.15),
                    duration: 0.5,
                    type: "spring"
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 0,
                    zIndex: 20,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img src={photo} alt={`Featured memory ${index + 1}`} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Photo Gallery Section */}
      <div className="photo-gallery">
        <motion.h2 
          className="gallery-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          What i've seen 📸
        </motion.h2>

        {/* Floating floral & heart decorations around the gallery */}
        <div className="photo-decorations">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="photo-decoration"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                transform: `scale(${0.8 + Math.random() * 0.7})`
              }}
            >
              {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌼' : '💖'}
            </div>
          ))}
        </div>

        <div className="photos-container">
          {photoGallery.map((photo, index) => {
            const position = getRandomPosition(index)
            return (
              <motion.div
                key={index}
                className="photo-frame"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  transform: `rotate(${position.rotate}deg)`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8 + (index * 0.15),
                  duration: 0.5,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.2 }
                }}
              >
                <img src={photo} alt={`Memory ${index + 1}`} />
                <div className="photo-tape"></div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Continue Button */}
      <motion.div 
        className="continue-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <button 
          className="continue-btn" 
          onClick={handleContinue}
        >
          Continue to Message 💌
        </button>
      </motion.div>

      {/* Hidden audio element - uses local MP3 file */}
      <audio 
        id="background-music" 
        loop 
        autoPlay
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
      >
        <source src="/music/song.mp3" type="audio/mpeg" />
      </audio>

    </div>
  )
}

export default MusicAndPhotosPage
